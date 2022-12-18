import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Document} from "../document/document.entity"

export enum ExportStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

@Entity()
export class Export {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
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
    status: ExportStatus;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', nullable: true})
    processedAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', nullable: true})
    errorAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', nullable: true})
    doneAt: Date;

    @ApiProperty({readOnly: true})
    @OneToOne(() => Document, {nullable: true}) @JoinColumn()
    document: Document;


}
