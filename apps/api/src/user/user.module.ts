import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';

import {userProviders} from "./user.provider";
import {DatabaseModule} from "../database/database.module";
import {UserResolver} from "./user.resolver";
import {CustomerModule} from "../customer/customer.module";
import {CustomerService} from "../customer/customer.service";
import {customerProviders} from "../customer/customer.provider";

@Module({
    imports: [DatabaseModule, CustomerModule
    ],
    controllers: [UserController],
    providers: [UserService, ...userProviders, UserResolver, CustomerModule, CustomerService, ...customerProviders]
})
export class UserModule {
}
