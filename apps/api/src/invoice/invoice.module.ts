import {Module} from '@nestjs/common';
import {InvoiceService} from './invoice.service';
import {InvoiceController} from './invoice.controller';
import {DatabaseModule} from "../database/database.module";
import {invoiceProviders} from "./invoice.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [InvoiceController],
    providers: [InvoiceService, ...invoiceProviders]
})
export class InvoiceModule {
}
