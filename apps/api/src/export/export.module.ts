import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Export} from "./export.entity";
import {ExportController} from "./export.controller";
import {ExportService} from "./export.service";
import {exportProviders} from "./export.provider";
import {DocumentService} from "../document/document.service";
import {documentProviders} from "../document/document.provider";


@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Export])],
    controllers: [ExportController],
    providers: [ExportService, ...exportProviders, DocumentService, ...documentProviders],
})
export class ExportModule {
}
