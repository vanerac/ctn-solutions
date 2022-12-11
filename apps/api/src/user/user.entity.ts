import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

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
}
