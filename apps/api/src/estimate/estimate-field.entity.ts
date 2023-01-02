import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Estimate} from "./estimate.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class EstimateField {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ApiProperty({type: () => Estimate})
    @ManyToOne(type => Estimate, estimate => estimate.items, {onDelete: "CASCADE"}) @JoinColumn()
    @Field(() => Estimate)
    estimate: Estimate;


    @ApiProperty()
    @Column()
    @Field()
    title: string;

    @ApiProperty()
    @Column()
    @Field()
    description: string;

    @ApiProperty()
    @Column()
    @Field()
    quantity: number;

    @ApiProperty()
    @Column()
    @Field()
    unitPrice: number;

    @ApiProperty()
    @Column()
    @Field()
    discount: number;

    @ApiProperty()
    @Column()
    @Field()
    tax: number;
}
