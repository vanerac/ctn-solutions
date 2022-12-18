import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Export} from "../export/export.entity";
import {Invoice} from "./invoice.entity";

@Entity()
export class InvoiceExport {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty({nullable: false, type: () => Invoice})
    @ManyToOne(type => Invoice, {nullable: true}) @JoinColumn()
    invoice: Invoice;


    @ApiProperty({nullable: false, type: () => Export})
    @ManyToOne(type => Export, {nullable: true}) @JoinColumn()
    export: Export;
}
