import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Signature} from "./signature.entity";


@Entity()
export class Document {
    @ApiProperty({readOnly: true})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ApiProperty({readOnly: true})
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    // URL
    @ApiProperty({readOnly: true})
    @Column({nullable: true})
    url: string;

    @ApiProperty({readOnly: true, type: () => Signature, isArray: true, nullable: true})
    @OneToMany(() => Signature, sig => sig.document)
    signatures?: Signature[];
}
