import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Document} from "./document.entity";

export enum SignatureType {
    SIGNATURE = 'SIGNATURE',
    INITIALS = 'INITIALS',
}

export enum SignatureStatus {
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE',
}

@Entity()
export class Signature {
    // id, anchors, signatureUrl, status, document, type

    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    // Anchors
    @ApiProperty({readOnly: true})
    @Column({type: 'json', nullable: true})
    anchors: {
        top: number
        left: number
        width: number
        height: number
        id: string
    };

    // URL
    @ApiProperty({readOnly: true, nullable: true})
    @Column({nullable: true})
    signatureUrl?: string;

    @ApiProperty(
        {
            enum: SignatureStatus,
            enumName: 'SignatureStatus',
            description: 'The status of the signature',
            readOnly: true
        },
    )
    @Column(
        {
            type: 'enum',
            enum: SignatureStatus,
            default: SignatureStatus.PENDING,
        }
    )
    status: SignatureStatus;

    @ApiProperty(
        {
            enum: SignatureType,
            enumName: 'SignatureType',
            description: 'The type of the signature',
            readOnly: true
        },
    )
    @Column(
        {
            type: 'enum',
            enum: SignatureType,
            default: SignatureType.SIGNATURE,

        })
    type: SignatureType;

    @ApiProperty({readOnly: true, nullable: true})
    @ManyToOne(() => Document, document => document.signatures) @JoinColumn()
    document: Document;

}
