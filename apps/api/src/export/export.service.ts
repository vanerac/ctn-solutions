import {Inject, Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from "path";
import {Cluster} from "puppeteer-cluster";


import * as Mustache from 'mustache';
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

    async text() {
        const template = fs.readFileSync(path.join(__dirname, 'invoice/default.html'), {encoding: 'utf8'});
        const HTML = Mustache.render(template, {invoiceNumber: "12345"});
        return this.queue(HTML);

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
            maxConcurrency: 2,
        });

        await this.cluster.task(async ({page, data: {html, exportId}}) => {

            console.log('Processing export', exportId);
            await page.goto(`data:text/html,${html}`, {waitUntil: 'networkidle0'});
            const pdf = await page.pdf({format: 'A4'});

            console.log('pdf', pdf);

            const doc = await this.documentService.uploadFile(pdf, Date.now() + '.pdf');

            console.log(doc)

            await this.ExportRepository.update(exportId, {
                processedAt: new Date(),
                doneAt: new Date(),
                updatedAt: new Date(),
                status: ExportStatus.DONE,
                document: doc
            });

            return {url: doc.url};
        })

    }
}
