import {Module} from '@nestjs/common';
import {InvoiceService} from './invoice.service';
import {InvoiceController} from './invoice.controller';
import {DatabaseModule} from "../database/database.module";
import {invoiceProviders} from "./invoice.provider";
import {DocumentModule} from "../document/document.module";
import {ExportModule} from "../export/export.module";

@Module({
    imports: [DatabaseModule, DocumentModule, ExportModule],
    controllers: [InvoiceController],
    providers: [
        InvoiceService,
        ...invoiceProviders,
    ],
})
export class InvoiceModule {
}
