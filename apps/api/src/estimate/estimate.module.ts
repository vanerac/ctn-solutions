import {Module} from '@nestjs/common';
import {EstimateService} from './estimate.service';
import {EstimateController} from './estimate.controller';
import {estimateProviders} from "./estimate.provider";
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Estimate} from "./estimate.entity";
import {EstimateField} from "./estimate-field.entity";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([EstimateField, Estimate])],
    controllers: [EstimateController],
    providers: [EstimateService, ...estimateProviders]
})
export class EstimateModule {
}
