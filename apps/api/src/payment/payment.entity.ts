import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {User} from "../user/user.entity";


enum PaymentMethod {
    CASH = 'cash',
    CHECK = 'check',
    CARD = 'card',
    BANK_TRANSFER = 'bank_transfer',
    OTHER = 'other',
}

registerEnumType(PaymentMethod, {
    name: 'PaymentMethod',
})

@Entity()
@ObjectType()
export class Payment {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    // Customer
    @ApiProperty({type: () => Customer})
    @OneToOne(type => Customer, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    @Field(() => Customer)
    customer: Customer;

    // User
    @ApiProperty({type: () => User})
    @OneToOne(type => User, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    @Field(() => User)
    user: User;


    // Amount
    @ApiProperty()
    @Column()
    @Field(() => Int)
    amount: number;

    // Date
    @ApiProperty()
    @Column()
    @Field(() => Date)
    date: Date;

    // Notes
    @ApiProperty()
    @Column()
    @Field(() => String)
    notes: string;

    // Payment Method
    @ApiProperty({
        enum: PaymentMethod,
        enumName: 'PaymentMethod',
    })
    @Column({
        type: 'enum',
        enum: PaymentMethod,
    })
    @Field(() => PaymentMethod)
    paymentMethod: PaymentMethod;
}
