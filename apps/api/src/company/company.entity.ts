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
    @ApiProperty()
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
        // unique: true,
        nullable: false
    })
    siret: string;

    @ApiProperty()
    @Column()
    ape: string;

    @ApiProperty(
        {
            enum: LegalForm,
            enumName: 'LegalForm',
        }
    )
    @Column({
        type: "enum",
        enum: LegalForm,
        nullable: false,
    })
    legalform: LegalForm;

    // Display Settings

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
