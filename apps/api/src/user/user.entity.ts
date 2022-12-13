import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {Company} from '../company/company.entity';
import {Customer} from "../customer/customer.entity";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @OneToOne(type => Company) @JoinColumn()
    Company: number;

    // Customers
    @ApiProperty()
    @OneToMany(type => Customer, customer => customer.user)
    customers: Customer[];
}
