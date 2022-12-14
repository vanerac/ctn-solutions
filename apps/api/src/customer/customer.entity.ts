import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";

@Entity()
export class Customer {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column()
    firstname: string;

    @ApiProperty()
    @Column()
    lastname: string;

    @ApiProperty()
    @Column()
    phone: string;

    @ApiProperty()
    @Column()
    email: string;


    @ApiProperty({nullable: true, type: () => Company})
    @OneToOne(() => Company, {nullable: true, onDelete: "CASCADE"}) @JoinColumn(
    )
    company: Company;

    @ManyToOne(() => User, (user) => user.customers, {onDelete: 'CASCADE'})
    user: User
}
