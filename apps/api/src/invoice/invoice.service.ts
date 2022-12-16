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


        const estimate = this.invoiceRepository.create({
            ...createInvoiceDto,
            owner: user
        })

        await this.invoiceRepository.save(estimate);

        for (const item of createInvoiceDto.items) {
            const estimateField = new InvoiceField();
            estimateField.title = item.title;
            estimateField.quantity = item.quantity;
            estimateField.unitPrice = item.unitPrice;
            estimateField.tax = item.tax;
            estimateField.discount = item.discount;
            estimateField.description = item.description;
            estimateField.invoice = estimate;

            await this.invoiceFieldRepository.save(estimateField);

        }

    }

    async findAll() {
        return this.invoiceRepository.find({
            relations:
                [
                    "customer",
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
