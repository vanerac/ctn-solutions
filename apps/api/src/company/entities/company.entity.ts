import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

enum LegalForm {
    AE = 'AE',
    SARL = 'SARL',
    SAS = 'SAS',
    SASU = 'SASU',
    EURL = 'EURL',
    EI = 'EI',
    EIRL = 'EIRL'
}

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    legalname: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    taxid: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    address: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    city: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    state: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    zip: string;

    @ApiProperty()
    @Column({
        unique: true,
        nullable: false
    })

    siret: string;

    @ApiProperty()
    @Column()
    ape: string;

    @ApiProperty()
    @Column({
        type: "enum",
        enum: LegalForm,
    })
    legalform: LegalForm;


    // Optional fields

    @ApiProperty()
    @Column()
    phone: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    website: string;

    @ApiProperty()
    @Column()
    logo: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    industry: string;
}