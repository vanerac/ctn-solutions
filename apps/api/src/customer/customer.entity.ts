import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Company} from "../company/company.entity";
import {User} from "../user/user.entity";

@Entity()
export class Customer {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column({
        default: null
    })
    password: string;

    @ApiProperty()
    @Column({
        default: null
    })

    @ApiProperty()
    @OneToOne(() => Company) @JoinColumn()
    company: number;

    @ManyToOne(() => User, (user) => user.customers)
    user: User
}
