import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DatabaseModule} from "./database/database.module";
import {CustomerModule} from './customer/customer.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstimateModule} from './estimate/estimate.module';
import {AuthModule} from "./auth/auth.module";
import {CompanyModule} from "./company/company.module";
import {InvoiceModule} from './invoice/invoice.module';
import {ExportModule} from "./export/export.module";
import {DocumentModule} from './document/document.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {PaymentModule} from './payment/payment.module';
import { ExpenseModule } from './expense/expense.module';
import { ProjectModule } from './project/project.module';
import * as path from "path";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST ?? 'localhost',
            port: +process.env.DB_PORT ?? 5432,
            username: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? 'postgres',
            database: process.env.DB_NAME ?? 'postgres',
            entities: [
                __dirname + '/**/*.entity{.ts,.js}',
            ],
            synchronize: true,
            autoLoadEntities: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: path.join('..', "..", 'libs', 'schemas', 'graphql.gql'),
            logger: {
                info: (message) => console.log(message),
                warn: (message) => console.warn(message),
                error: (message) => console.error(message),
                debug: (message) => console.debug(message)
            },
            debug: true,
        }),
        UserModule,
        DatabaseModule,
        AuthModule,
        EstimateModule,
        CompanyModule,
        CustomerModule,
        InvoiceModule,
        ExportModule,
        DocumentModule,
        PaymentModule,
        ExpenseModule,
        ProjectModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
