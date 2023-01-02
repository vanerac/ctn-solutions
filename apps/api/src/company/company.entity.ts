import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql";

enum LegalForm {
    AE = 'AE',
    SARL = 'SARL',
    SAS = 'SAS',
    SASU = 'SASU',
    EURL = 'EURL',
    EI = 'EI',
    EIRL = 'EIRL'
}

registerEnumType(LegalForm, {
    name: 'LegalForm',
});

@Entity()
@ObjectType()
export class Company {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    @Field(() => Int)
    id: number;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    @Field()
    legalname: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    @Field()
    taxid: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    @Field()
    address: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    @Field()
    city: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    @Field()
    state: string;

    @ApiProperty()
    @Column({
        nullable: false,
    })
    @Field()
    zip: string;

    @ApiProperty()
    @Column({
        // unique: true,
        nullable: false
    })
    @Field()
    siret: string;

    @ApiProperty()
    @Column()
    @Field()
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
    @Field(() => LegalForm,)
    legalform: LegalForm;

    // Display Settings

    @ApiProperty()
    @Column()
    @Field()
    website: string;

    @ApiProperty()
    @Column()
    @Field()
    logo: string;

    @ApiProperty()
    @Column()
    @Field()
    description: string;

    @ApiProperty()
    @Column()
    @Field()
    industry: string;


}
