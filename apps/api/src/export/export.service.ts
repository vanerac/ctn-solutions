import {Inject, Injectable} from '@nestjs/common';
import {Cluster} from "puppeteer-cluster";
import {Repository} from "typeorm";
import {Export, ExportStatus} from "./export.entity";
import {DocumentService} from "../document/document.service";
import {Signature, SignatureStatus, SignatureType} from "../document/document.entity";

@Injectable()
export class ExportService {
    private cluster: Cluster<{ html: string, exportId: number }, { url: string }>;

    constructor(
        @Inject('EXPORT_REPOSITORY')
        private ExportRepository: Repository<Export>,
        @Inject(DocumentService)
        private documentService: DocumentService,
        @Inject('SIGNATURE_REPOSITORY')
        private signatureRepository: Repository<Signature>,
    ) {
        this.init();
    }

    async test() {
        // console.log(path.join(__dirname, 'invoice/default.html'));
        // // const template = fs.readFileSync(path.join(__dirname, '../../..', 'templates', 'invoice/default.html'), {encoding: 'utf8'});
        //
        // const view: data = {
        //     customer_country: 'USA',
        //
        //     bill_to_address: '123 Main St',
        //     bill_to_city: 'New York',
        //     bill_to_country: 'USA',
        //     bill_to_name: 'John Doe',
        //     bill_to_state: 'NY',
        //     bill_to_zip: '10001',
        //
        //     customer_address: '123 Main St',
        //     customer_city: 'New York',
        //     customer_name: 'John Doe',
        //     customer_state: 'NY',
        //     customer_zip: '10001',
        //     due_date: '2020-01-01',
        //     invoice_date: '2020-01-01',
        //     invoice_number: '123',
        //     items: [
        //         {
        //             item: 'Item 1',
        //             description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
        //             quantity: '1',
        //             unit_price: '100',
        //             amount: '100'
        //         }, {
        //             item: 'Item 2',
        //             description: 'Description 2',
        //             quantity: '1',
        //             unit_price: '100',
        //             amount: '100'
        //         }, {
        //             item: 'Item 3',
        //             description: 'Description 3',
        //             quantity: '1',
        //             unit_price: '100',
        //             amount: '100'
        //
        //         }
        //     ],
        //     logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        //     total: '300'
        // }
        // const HTML = Mustache.render(template, view);
        // //
        // // console.log(HTML);
        // return this.queue(render(view));

    }

    async queue(html: string) {
        const exportObj = await this.ExportRepository.save({});
        await this.cluster.queue({html, exportId: exportObj.id});
        return exportObj;
    }

    async findAll() {
        return await this.ExportRepository.find();
    }

    async findOne(id: number) {
        return await this.ExportRepository.findOne({
            where: {
                id
            }
        });

    }

    remove(id: number) {
        this.ExportRepository.delete(id);
    }

    private async init() {
        this.cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 5,
            puppeteerOptions: {
                headless: true
            }
        });

        await this.cluster.task(async ({page, data: {html, exportId}}) => {

            console.time('Render ' + exportId);

            const base64 = Buffer.from(html).toString('base64');

            // A4 Format
            // await page.setViewport({width: 595, height: 842});

            await page.goto(`data:text/html;base64,${base64}`, {waitUntil: 'networkidle0'});
            // Inject script to run function in browser


            console.log(html)

            const bodyBounds = await page.$eval('body', (element) => {
                const {width, height} = element.getBoundingClientRect()
                return {width, height};
            })

            // TODO: implement signature anchors
            const signatureMetaDataPromise = page.$$eval(".signature", (elements) => {
                return elements.map((element) => {
                    const {x, y, width, height} = element.getBoundingClientRect()
                    const id = element.getAttribute('id');
                    const winWidth =
                        document.documentElement.clientWidth
                        || document.body.clientWidth;

                    const winHeight =
                        // window.innerHeight ||
                        document.documentElement.clientHeight
                        || document.body.clientHeight;
                    return {x, y, width, height, anchorId: id, winWidth, winHeight};
                })
            })


            const pdfPromise = page.pdf({format: 'A4'});

            const [pdf, signatureMetaData] = await Promise.all([pdfPromise, signatureMetaDataPromise]);

            console.timeEnd('Render ' + exportId);

            const doc = await this.documentService.uploadFile(pdf, 'export_' + exportId + '.pdf');


            console.log(signatureMetaData);

            // Save signature anchors
            await Promise.all(signatureMetaData.map(async (metaData) => {
                const sig = this.signatureRepository.create({
                    anchors: {
                        id: metaData.anchorId,
                        height: metaData.height,
                        width: metaData.width,
                        left: metaData.x,
                        top: metaData.y,
                        winHeight: bodyBounds.height,
                        winWidth: bodyBounds.width,
                        scale: 1
                    },
                    type: SignatureType.SIGNATURE,
                    createdAt: new Date(),
                    status: SignatureStatus.PENDING,
                    document: doc
                })

                console.log(sig)

                return this.signatureRepository.save(sig);

            }))

            await this.ExportRepository.update(exportId, {
                processedAt: new Date(),
                doneAt: new Date(),
                updatedAt: new Date(),
                status: ExportStatus.DONE,
                document: doc
            });

            console.log(doc.url)

            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 600000)
            })

            return {url: doc.url, signatureMetaData};
        })

    }
}
