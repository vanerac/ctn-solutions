import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Document} from "../document/document.entity"
import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";

export enum ExportStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

registerEnumType(ExportStatus, {
    name: 'ExportStatus',
})

@Entity()
@ObjectType()
export class Export {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ApiProperty(
        {
            enum: ExportStatus,
            enumName: 'ExportStatus',
            description: 'The status of the export',
            readOnly: true
        },
    )
    @Column(
        {
            type: 'enum',
            enum: ExportStatus,
            default: ExportStatus.PENDING,
        }
    )
    @Field(() => ExportStatus)
    status: ExportStatus;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    createdAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    updatedAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    processedAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    errorAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', nullable: true})
    @Field({nullable: true})
    doneAt: Date;

    @ApiProperty({readOnly: true, nullable: true})
    @OneToOne(() => Document, {nullable: true}) @JoinColumn()
    @Field(() => Document, {nullable: true})
    document?: Document;


    // @ApiProperty({readOnly: true})
    // @ManyToOne(type => Invoice, {nullable: true, onDelete: "CASCADE"}) @JoinColumn()
    // invoice: Invoice;


}
