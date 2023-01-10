import {Module} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {PaymentController} from './payment.controller';
import {paymentProviders} from "./payment.provider";
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./payment.entity";
import PaymentResolver from "./payment.resolver";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Payment])],
    controllers: [PaymentController],
    providers: [PaymentService, ...paymentProviders, PaymentResolver],
})
export class PaymentModule {
}
