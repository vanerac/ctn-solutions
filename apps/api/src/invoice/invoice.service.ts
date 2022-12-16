import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../user/user.entity";
import {Invoice} from "./invoice.entity";
import {InvoiceField} from "./invoice-fields.entity";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {UpdateInvoiceDto} from "./dto/update-invoice.dto";

@Injectable()
export class InvoiceService {
    constructor(
        @Inject('INVOICE_REPOSITORY')
        private invoiceRepository: Repository<Invoice>,
        @Inject('INVOICE_FIELD_REPOSITORY')
        private invoiceFieldRepository: Repository<InvoiceField>,
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
                        "items"
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
        });

        await Promise.all([itemsPromise, updatePromise]);

    }

    async remove(id: number) {
        return this.invoiceRepository.delete(id);
    }
}
