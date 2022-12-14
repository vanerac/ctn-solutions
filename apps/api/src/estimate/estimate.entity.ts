import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";
import {EstimateField} from "./estimate-field.entity";

enum EstimateStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    CANCELLED = 'cancelled',
    CHANGES_REQUESTED = 'changes_requested',
    EXPIRED = 'expired',
}


@Entity()
export class Estimate {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    // Client / Customer
    // Billing Address
    // Shipping Address
    // Items
    // Date
    // Due Date
    // Terms
    // Notes
    // Tax
    // Global Discount

    @ApiProperty({type: () => Customer})
    @ManyToOne(type => Customer, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    customer: Customer;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    billingAddress: Company;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    shippingAddress: Company;

    @ApiProperty({type: () => EstimateField, isArray: true})
    @OneToMany(type => EstimateField, item => item.estimate)
    items: EstimateField[];

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
        enum: EstimateStatus,
        enumName: 'EstimateStatus',
    })
    @Column()
    status: string;
}
