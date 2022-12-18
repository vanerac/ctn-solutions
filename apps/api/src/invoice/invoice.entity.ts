import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";
import {InvoiceField} from "./invoice-fields.entity";
import {Export} from "../export/export.entity";

enum InvoiceStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    CANCELLED = 'cancelled',
    CHANGES_REQUESTED = 'changes_requested',
    EXPIRED = 'expired',
}


@Entity()
export class Invoice {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({type: () => Customer})
    @ManyToOne(type => Customer, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    customer: Customer;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    billingAddress: Company;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    shippingAddress: Company;

    @ApiProperty({type: () => InvoiceField, isArray: true})
    @OneToMany(type => InvoiceField, item => item.invoice)
    items: InvoiceField[];

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    // Date
    @ApiProperty()
    @Column()
    date: Date;

    // Due Date
    @ApiProperty()
    @Column()
    dueDate: Date;

    // Terms
    @ApiProperty()
    @Column()
    terms: string;

    // Notes
    @ApiProperty()
    @Column()
    notes: string;

    // Tax
    @ApiProperty()
    @Column()
    tax: number;

    // Global Discount
    @ApiProperty()
    @Column()
    globalDiscount: number;


    // Owner
    @ApiProperty()
    @ManyToOne(type => User, {nullable: false}) @JoinColumn()
    owner: User;

    @ApiProperty()
    @Column()
    createdAt: Date;

    @ApiProperty()
    @Column()
    updatedAt: Date;

    @ApiProperty({
        enum: InvoiceStatus,
        enumName: 'InvoiceStatus',
    })
    @Column()
    status: InvoiceStatus;

    @ApiProperty({type: () => InvoiceExport, isArray: true})
    @OneToMany(type => InvoiceExport, (item) => item.invoice, {nullable: true}) @JoinColumn()
    exports: InvoiceExport[];
}


@Entity()
export class InvoiceExport {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({nullable: false, type: () => Invoice})
    @ManyToOne(type => Invoice, {nullable: true}) @JoinColumn()
    invoice: Invoice;


    @ApiProperty({nullable: false, type: () => Export})
    @ManyToOne(type => Export, {nullable: true}) @JoinColumn()
    export: Export;
}
