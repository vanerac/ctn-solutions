import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import configuration from "../configuration";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {userProviders} from "../user/user.provider";
import {databaseProviders} from "../database/database.providers";

@Module({
    imports: [UserModule,
        PassportModule,
        JwtModule.register({
            secret: configuration.JWT_SECRET,
            signOptions: {expiresIn: '1h'},
        }),],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, ...userProviders, ...databaseProviders]
})
export class AuthModule {
}
