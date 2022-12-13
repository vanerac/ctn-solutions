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


    @ApiProperty({nullable: true})
    @OneToOne(() => Company) @JoinColumn(
    ) @Column({nullable: true})
    company?: number;

    @ManyToOne(() => User, (user) => user.customers)
    user: User
}
