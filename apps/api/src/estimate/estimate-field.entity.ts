import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Estimate} from "./estimate.entity";

@Entity()
export class EstimateField {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({type: () => Estimate})
    @ManyToOne(type => Estimate, estimate => estimate.items) @JoinColumn()
    estimate: Estimate;


    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    quantity: number;

    @ApiProperty()
    @Column()
    unitPrice: number;

    @ApiProperty()
    @Column()
    discount: number;

    @ApiProperty()
    @Column()
    tax: number;
}
