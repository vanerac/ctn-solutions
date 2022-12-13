import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";
import {EstimateFields} from "./estimate-field.entity";

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

    @ApiProperty()
    @OneToOne(type => Customer) @JoinColumn()
    customer: number;

    @ApiProperty()
    @OneToOne(type => Company) @JoinColumn()
    billingAddress: number;

    @ApiProperty()
    @OneToOne(type => Company) @JoinColumn()
    shippingAddress: number;

    @ApiProperty({type: () => EstimateFields, isArray: true})
    @OneToMany(type => EstimateFields, item => item.estimate)
    items: EstimateFields[];

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
    @OneToOne(type => User) @JoinColumn()
    owner: number;
}
