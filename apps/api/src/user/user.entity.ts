import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Company} from '../company/company.entity';
import {Customer} from "../customer/customer.entity";
import {Field, Int, ObjectType} from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
    @ApiProperty()
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    @Field()
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @OneToOne(type => Company) @JoinColumn()
    @Field(() => Company, {nullable: true})
    Company: number;

    // Customers
    @ApiProperty()
    @OneToMany(type => Customer, customer => customer.user)
    @Field(() => [Customer], {nullable: true})
    customers: Customer[];
}
