import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Customer {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;


    @ApiProperty()
    @Column()
    @Field()
    firstname: string;

    @ApiProperty()
    @Column()
    @Field()
    lastname: string;

    @ApiProperty()
    @Column()
    @Field()
    phone: string;

    @ApiProperty()
    @Column()
    @Field()
    email: string;


    @ApiProperty({nullable: true, type: () => Company})
    @OneToOne(() => Company, {nullable: true, onDelete: "CASCADE"}) @JoinColumn(
    )
    @Field(() => Company, {nullable: true})
    company: Company;

    @ManyToOne(() => User, (user) => user.customers, {onDelete: 'CASCADE'})
    @Field(() => User)
    user: User
}
