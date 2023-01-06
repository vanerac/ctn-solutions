import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Export} from "./export.entity";
import {ExportController} from "./export.controller";
import {ExportService} from "./export.service";
import {exportProviders} from "./export.provider";
import {DocumentModule} from "../document/document.module";
import ExportResolver from "./export.resolver";


@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Export]), DocumentModule],
    controllers: [ExportController],
    providers: [ExportService, ...exportProviders, ExportResolver],
    exports: [ExportService, ...exportProviders,]

})
export class ExportModule {
}
