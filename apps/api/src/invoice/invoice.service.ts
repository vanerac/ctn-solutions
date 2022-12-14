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
        return this.invoiceRepository.update(id, updateInvoiceDto);
    }

    async remove(id: number) {
        return this.invoiceRepository.delete(id);
    }
}
