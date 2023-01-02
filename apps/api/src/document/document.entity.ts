import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Field, Int, InterfaceType, ObjectType, registerEnumType} from "@nestjs/graphql";


export enum SignatureType {
    SIGNATURE = 'SIGNATURE',
    INITIALS = 'INITIALS',
}

export enum SignatureStatus {
    PENDING = 'PENDING',
    COMPLETE = 'COMPLETE',
}

registerEnumType(SignatureType, {
    name: 'SignatureType',
})

registerEnumType(SignatureStatus, {
    name: 'SignatureStatus',
})

@InterfaceType()
export class SignatureAnchor {
    @Field(() => Int)
    @ApiProperty()
    top: number

    @Field(() => Int)
    @ApiProperty()
    left: number

    @Field(() => Int)
    @ApiProperty()
    width: number

    @Field(() => Int)
    @ApiProperty()
    height: number

    @Field(() => Int)
    @ApiProperty()
    winWidth: number

    @Field(() => Int)
    @ApiProperty()
    winHeight: number

    @Field(() => Int)
    @ApiProperty()
    scale: number

    @Field(() => Int)
    @ApiProperty()
    id: string
}


@Entity()
@ObjectType()
export class Document {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    createdAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    updatedAt: Date;

    // URL
    @ApiProperty({readOnly: true})
    @Column({nullable: true})
    @Field({nullable: true})
    url: string;

    @ApiProperty({readOnly: true, type: () => Signature, isArray: true, nullable: true})
    @OneToMany(() => Signature, sig => sig.document)
    @Field(() => [Signature], {nullable: true})
    signatures?: Signature[];
}


@Entity()
@ObjectType()
export class Signature {
    // id, anchors, signatureUrl, status, document, type

    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    createdAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @Field()
    updatedAt: Date;

    // Anchors
    @ApiProperty({
        readOnly: true, type: () => SignatureAnchor,
        nullable: false
    })
    @Column({type: 'json', nullable: true})
    @Field(() => SignatureAnchor, {nullable: true})
    anchors: SignatureAnchor;


    // URL
    @ApiProperty({readOnly: true, nullable: true})
    @Column({nullable: true})
    @Field({nullable: true})
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
    @Field(() => SignatureStatus)
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
    @Field(() => SignatureType)
    type: SignatureType;

    @ApiProperty({readOnly: true, nullable: true})
    @ManyToOne(() => Document, document => document.signatures) @JoinColumn()
    @Field(() => Document, {nullable: true})
    document: Document;

}
