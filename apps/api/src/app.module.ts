import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DatabaseModule} from "./database/database.module";
import {AuthModule} from './auth/auth.module';
import {CompanyModule} from './company/company.module';
import {CustomerModule} from './customer/customer.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST ?? 'localhost',
            port: +process.env.DB_PORT ?? 5432,
            username: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? 'postgres',
            database: process.env.DB_NAME ?? 'postgres',
            entities: [],
            synchronize: true,
            autoLoadEntities: true,
        }),
        UserModule,
        DatabaseModule,
        AuthModule,
        CompanyModule,
        CustomerModule,

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
