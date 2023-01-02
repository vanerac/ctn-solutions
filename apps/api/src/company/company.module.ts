import {Module} from '@nestjs/common';
import {CompanyService} from './company.service';
import {CompanyController} from './company.controller';
import {DatabaseModule} from "../database/database.module";
import {companyProviders} from "./company.provider";
import CompanyResolver from "./company.resolver";

@Module({
    imports: [DatabaseModule],
    controllers: [CompanyController],
    providers: [CompanyService, ...companyProviders, CompanyResolver]
})
export class CompanyModule {
}
