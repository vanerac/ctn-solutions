import {Inject, Injectable} from '@nestjs/common';
import {Cluster} from "puppeteer-cluster";
import {Repository} from "typeorm";
import {Export, ExportStatus} from "./export.entity";
import {DocumentService} from "../document/document.service";

@Injectable()
export class ExportService {
    private cluster: Cluster<{ html: string, exportId: number }, { url: string }>;

    constructor(
        @Inject('EXPORT_REPOSITORY')
        private ExportRepository: Repository<Export>,
        @Inject(DocumentService)
        private documentService: DocumentService,
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
        });

        await this.cluster.task(async ({page, data: {html, exportId}}) => {

            console.time('Render ' + exportId);

            const base64 = Buffer.from(html).toString('base64');
            await page.goto(`data:text/html;base64,${base64}`, {waitUntil: 'networkidle0'});
            const pdf = await page.pdf({format: 'A4'});

            console.timeEnd('Render ' + exportId);

            const doc = await this.documentService.uploadFile(pdf, 'export_' + exportId + '.pdf');


            await this.ExportRepository.update(exportId, {
                processedAt: new Date(),
                doneAt: new Date(),
                updatedAt: new Date(),
                status: ExportStatus.DONE,
                document: doc
            });

            console.log(doc.url)

            return {url: doc.url};
        })

    }
}
