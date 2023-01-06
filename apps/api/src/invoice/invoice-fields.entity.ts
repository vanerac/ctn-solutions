import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Invoice} from "./invoice.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class InvoiceField {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ApiProperty({type: () => Invoice})
    @ManyToOne(type => Invoice, invoice => invoice.items, {onDelete: "CASCADE"}) @JoinColumn()
    @Field(() => Invoice)
    invoice: Invoice;


    @ApiProperty()
    @Column()
    @Field()
    title: string;

    @ApiProperty()
    @Column()
    @Field()
    description: string;

    @ApiProperty()
    @Column()
    @Field()
    quantity: number;

    @ApiProperty()
    @Column()
    @Field()
    unitPrice: number;

    @ApiProperty()
    @Column()
    @Field()
    discount: number;

    @ApiProperty()
    @Column()
    @Field()
    tax: number;
}
