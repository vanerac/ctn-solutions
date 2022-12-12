import {Module} from '@nestjs/common';
import {CompanyService} from './company.service';
import {CompanyController} from './company.controller';
import {DatabaseModule} from "../database/database.module";
import {companyProviders} from "./company.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [CompanyController],
    providers: [CompanyService, ...companyProviders]
})
export class CompanyModule {
}
