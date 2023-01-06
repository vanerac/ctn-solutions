import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";
import {EstimateField} from "./estimate-field.entity";
import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";

enum EstimateStatus {
    DRAFT = 'draft',
    SENT = 'sent',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    CANCELLED = 'cancelled',
    CHANGES_REQUESTED = 'changes_requested',
    EXPIRED = 'expired',
}


registerEnumType(EstimateStatus, {
    name: 'EstimateStatus',
})

@Entity()
@ObjectType()
export class Estimate {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
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
    @Field(() => Customer)
    customer: Customer;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    @Field(() => Company)
    billingAddress: Company;

    @ApiProperty({type: () => Company})
    @ManyToOne(type => Company, {nullable: true}) @JoinColumn()
    @Field(() => Company)
    shippingAddress: Company;

    @ApiProperty({type: () => EstimateField, isArray: true})
    @OneToMany(type => EstimateField, item => item.estimate)
    @Field(() => [EstimateField])
    items: EstimateField[];

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
        enum: EstimateStatus,
        enumName: 'EstimateStatus',
    })
    @Column(
        {
            type: 'enum',
            enum: EstimateStatus,
            default: EstimateStatus.DRAFT,
        }
    )
    @Field(() => EstimateStatus)
    status: EstimateStatus;
}
