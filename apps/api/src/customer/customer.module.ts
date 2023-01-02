import {Module} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CustomerController} from './customer.controller';
import {customerProviders} from "./customer.provider";
import {DatabaseModule} from "../database/database.module";
import CustomerResolver from "./customer.resolver";

@Module({
    imports: [DatabaseModule],
    controllers: [CustomerController],
    providers: [CustomerService, ...customerProviders, CustomerResolver]
})
export class CustomerModule {
}
