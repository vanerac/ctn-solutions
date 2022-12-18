import * as mustache from 'mustache'
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../user/user.entity";
import {Invoice, InvoiceExport} from "./invoice.entity";
import {InvoiceField} from "./invoice-fields.entity";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {UpdateInvoiceDto} from "./dto/update-invoice.dto";
import * as path from "path";
import * as fs from "fs";
import {data} from "../templates/invoice/default";
import {ExportService} from "../export/export.service";

@Injectable()
export class InvoiceService {
    constructor(
        @Inject('INVOICE_REPOSITORY')
        private invoiceRepository: Repository<Invoice>,
        @Inject('INVOICE_FIELD_REPOSITORY')
        private invoiceFieldRepository: Repository<InvoiceField>,
        @Inject('INVOICE_EXPORT_REPOSITORY')
        private invoiceExportRepository: Repository<InvoiceExport>,
        @Inject(ExportService)
        private exportService: ExportService
    ) {
    }


    async create(createInvoiceDto: CreateInvoiceDto, user: User) {

        const {items, ...invoiceData} = createInvoiceDto;

        const invoice = this.invoiceRepository.create({
            ...invoiceData,
            owner: user
        })

        const invoiceDB = await this.invoiceRepository.save(invoice);

        invoiceDB.items = await Promise.all((items ?? [])?.map(async (item) => {
            const invoiceField = new InvoiceField();
            invoiceField.title = item.title;
            invoiceField.quantity = item.quantity;
            invoiceField.unitPrice = item.unitPrice;
            invoiceField.tax = item.tax;
            invoiceField.discount = item.discount;
            invoiceField.description = item.description;
            invoiceField.invoice = invoiceData as Invoice;

            return invoiceField;

            // return await this.invoiceFieldRepository.save(invoiceField);
        }))

        return invoiceDB;


    }

    async findAll() {
        return this.invoiceRepository.find({
            relations:
                [
                    "customer",
                    "customer.company",
                    "items"
                ],
            relationLoadStrategy: "join"
        });
    }

    async findOne(id: number) {
        return this.invoiceRepository.findOne(
            {
                where: {id: id},
                relations:
                    [
                        "customer",
                        "customer.company",
                        "items",
                        "exports",
                        "exports.export.document",
                        "exports.export.document.signatures"
                    ],
                relationLoadStrategy: "join"
            }
        )
    }

    async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {

        console.log(updateInvoiceDto)

        const invoice = await this.invoiceRepository.findOne(
            {
                where: {id: id},
            }
        )


        const itemsPromise = Promise.all(updateInvoiceDto.items.map(async item => {
            const i = new InvoiceField();
            i.id = item.id;
            i.title = item.title;
            i.quantity = item.quantity;
            i.unitPrice = item.unitPrice;
            i.tax = item.tax;
            i.discount = item.discount;
            i.description = item.description;
            i.invoice = invoice;


            if (item.id) {
                return this.invoiceFieldRepository.update(item.id, i);
            } else {
                return this.invoiceFieldRepository.save(i);
            }
        }))


        const {items, ...invoiceData} = updateInvoiceDto;
        const updatePromise = this.invoiceRepository.update(id, {
            ...invoiceData,
            updatedAt: new Date()
        });

        await Promise.all([itemsPromise, updatePromise]);

    }

    async remove(id: number) {
        return this.invoiceRepository.delete(id);
    }

    async export(id: number) {
        const invoice = await this.invoiceRepository.findOne({
            where: {id: id},
            relations:
                [
                    "customer",
                    "customer.company",
                    "items"
                ],

        });

        const template = fs.readFileSync(path.join(__dirname, '../..', 'templates', 'invoice/default.html'), {encoding: 'utf8'});

        const view: data = {
            items: invoice.items.map(item => {
                return {
                    item: item.title,
                    description: item.description,
                    quantity: item.quantity.toString(),
                    unit_price: item.unitPrice.toString(),
                    amount: (item.quantity * item.unitPrice).toString()
                }
            }),
            total: invoice.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0).toString(),
            logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',

            invoice_number: invoice.id.toString(),
            invoice_date: invoice.createdAt.toDateString(),
            due_date: invoice.dueDate.toDateString(),

            bill_to_address: invoice?.customer?.company?.address,
            bill_to_name: invoice?.customer?.company?.legalname,
            bill_to_state: invoice?.customer?.company?.state,
            bill_to_city: invoice?.customer?.company?.city,
            bill_to_zip: invoice?.customer?.company?.zip,
            bill_to_country: 'france', // TODO

            customer_zip: invoice?.customer?.company?.zip,
            customer_city: invoice?.customer?.company?.city,
            customer_state: invoice?.customer?.company?.state,
            customer_country: 'france', // TODO
            customer_address: invoice?.customer?.company?.address,

            customer_name: invoice?.customer?.company?.legalname,


        }

        const HTML = mustache.render(template, view);

        const exportStatus = await this.exportService.queue(HTML);

        console.log(exportStatus);

        const invoiceExport = this.invoiceExportRepository.create({
            invoice: invoice,
            export: exportStatus
        })

        return this.invoiceExportRepository.save(invoiceExport);


    }
}
