import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";
import {Customer} from "../customer/customer.entity";
import {Invoice} from "../invoice/invoice.entity";
import {Estimate} from "../estimate/estimate.entity";
import {User} from "../user/user.entity";

@Entity()
@ObjectType()
export class Project {
    // ID
    // Invoices
    // Estimates
    // Customer
    // User
    // Title
    // Desc

    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ApiProperty()
    @Field()
    @Column()
    title: string;

    @ApiProperty()
    @Field()
    @Column()
    description: string;

    @ApiProperty({type: () => Customer})
    @Field(() => Customer)
    customer: Customer;

    @ApiProperty({type: () => Invoice, isArray: true})
    @Field(() => [Invoice])
    @ManyToOne(() => Invoice, {nullable: true, onDelete: "CASCADE"}) @JoinColumn()
    invoices: Invoice[];

    @ApiProperty({type: () => Estimate, isArray: true})
    @Field(() => [Estimate])
    @ManyToOne(() => Estimate, {nullable: true, onDelete: "CASCADE"}) @JoinColumn()
    estimates: Estimate[];

    @ApiProperty({type: () => User})
    @Field(() => User)
    @OneToOne(() => User, {nullable: false, onDelete: "CASCADE"}) @JoinColumn()
    user: User;


}
