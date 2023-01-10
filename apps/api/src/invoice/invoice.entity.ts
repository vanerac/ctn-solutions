import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";
import {InvoiceField} from "./invoice-fields.entity";
import {Export} from "../export/export.entity";
import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {Payment} from "../payment/payment.entity";

enum InvoiceStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    CANCELLED = 'cancelled',
    CHANGES_REQUESTED = 'changes_requested',
    EXPIRED = 'expired',
}


registerEnumType(InvoiceStatus, {
    name: 'InvoiceStatus',
})

@Entity()
@ObjectType()
export class Invoice {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;


    @ApiProperty({type: () => Customer})
    @ManyToOne(type => Customer, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    @Field(() => Customer)
    customer: Customer;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    @Field(() => Company, {nullable: true})
    billingAddress: Company;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    @Field(() => Company, {nullable: true})
    shippingAddress: Company;

    @ApiProperty({type: () => InvoiceField, isArray: true})
    @OneToMany(type => InvoiceField, item => item.invoice)
    @Field(() => [InvoiceField])
    items: InvoiceField[];

    @ApiProperty({type: () => Payment})
    @ManyToOne(type => Payment, {nullable: true}) @JoinColumn()
    @Field(() => Payment, {nullable: true})
    payment: Payment;

    @ApiProperty()
    @Column()
    @Field()
    title: string;

    @ApiProperty()
    @Column()
    @Field()
    description: string;

    // Date
    @ApiProperty()
    @Column()
    @Field()
    date: Date;

    // Due Date
    @ApiProperty()
    @Column()
    @Field()
    dueDate: Date;

    // Terms
    @ApiProperty()
    @Column()
    @Field()
    terms: string;

    // Notes
    @ApiProperty()
    @Column()
    @Field()
    notes: string;

    // Tax
    @ApiProperty()
    @Column()
    @Field()
    tax: number;

    // Global Discount
    @ApiProperty()
    @Column()
    @Field()
    globalDiscount: number;


    // Owner
    @ApiProperty()
    @ManyToOne(type => User, {nullable: false}) @JoinColumn()
    @Field(() => User)
    owner: User;

    @ApiProperty()
    @Column()
    @Field()
    createdAt: Date;

    @ApiProperty()
    @Column()
    @Field()
    updatedAt: Date;

    @ApiProperty({
        enum: InvoiceStatus,
        enumName: 'InvoiceStatus',
    })
    @Column()
    @Field(() => InvoiceStatus)
    status: InvoiceStatus;

    @ApiProperty({type: () => InvoiceExport, isArray: true})
    @OneToMany(type => InvoiceExport, (item) => item.invoice, {nullable: true}) @JoinColumn()
    @Field(() => [InvoiceExport], {nullable: true})
    exports: InvoiceExport[];
}


@Entity()
@ObjectType()
export class InvoiceExport {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;


    @ApiProperty({nullable: false, type: () => Invoice})
    @ManyToOne(type => Invoice, {nullable: true}) @JoinColumn()
    @Field(() => Invoice, {nullable: true})
    invoice: Invoice;


    @ApiProperty({nullable: false, type: () => Export})
    @ManyToOne(type => Export, {nullable: true}) @JoinColumn()
    @Field(() => Export, {nullable: true})
    export: Export;
}
