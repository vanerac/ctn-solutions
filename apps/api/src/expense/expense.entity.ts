import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {User} from "../user/user.entity";
import {Invoice} from "../invoice/invoice.entity";
import {Document} from '../document/document.entity';

enum ExpenseCategory {
    TRAVEL = 'travel',
    FOOD = 'food',
    MATERIALS = 'materials',
    OTHER = 'other',
}

registerEnumType(ExpenseCategory, {
    name: 'ExpenseCategory',
})

@Entity()
@ObjectType()
export class Expense {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    // Date
    @ApiProperty()
    @Field()
    @Column()
    date: Date;

    // Amount
    @ApiProperty()
    @Field()
    @Column()
    amount: number

    // Customer
    @ApiProperty({type: () => Customer})
    @Field(() => Customer)
    @ManyToOne(type => Customer, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    customer: Customer;

    // User
    @ApiProperty({type: () => User})
    @Field(() => User)
    @ManyToOne(type => User, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    user: User;

    // Invoice
    @ApiProperty({type: () => Invoice})
    @Field(() => Invoice)
    @ManyToOne(type => Invoice, {nullable: true, onDelete: "CASCADE"}) @JoinColumn()
    invoice: Invoice;


    @ApiProperty({
        enum: ExpenseCategory,
        enumName: 'ExpenseCategory'
    })
    @Field(() => ExpenseCategory)
    @Column({type: 'enum', enum: ExpenseCategory})
    category: ExpenseCategory;

    // Document
    @ApiProperty({type: () => Document, isArray: true})
    @Field(() => [Document])
    @OneToOne(type => Document, {nullable: true, onDelete: "CASCADE"}) @JoinColumn()
    document: Document;

}
