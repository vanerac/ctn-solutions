import {DataSource} from 'typeorm';
import {InvoiceField} from "./invoice-fields.entity";
import {Invoice, InvoiceExport} from "./invoice.entity";

export const invoiceProviders = [
    {
        provide: 'INVOICE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Invoice),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'INVOICE_FIELD_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceField),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'INVOICE_EXPORT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(InvoiceExport),
        inject: ['DATA_SOURCE'],
    }
];
