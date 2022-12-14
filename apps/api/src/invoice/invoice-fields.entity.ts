import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Invoice} from "./invoice.entity";

@Entity()
export class InvoiceField {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({type: () => Invoice})
    @ManyToOne(type => Invoice, invoice => invoice.items, {onDelete: "CASCADE"}) @JoinColumn()
    invoice: Invoice;


    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    quantity: number;

    @ApiProperty()
    @Column()
    unitPrice: number;

    @ApiProperty()
    @Column()
    discount: number;

    @ApiProperty()
    @Column()
    tax: number;
}
