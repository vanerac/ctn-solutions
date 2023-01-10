import {Module} from '@nestjs/common';
import {ExpenseService} from './expense.service';
import {ExpenseController} from './expense.controller';
import {expenseProviders} from "./expense.provider";
import ExpenseResolver from "./expense.resolver";
import {DatabaseModule} from "../database/database.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EstimateField} from "../estimate/estimate-field.entity";
import {Estimate} from "../estimate/estimate.entity";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([EstimateField, Estimate])],
    controllers: [ExpenseController],
    providers: [ExpenseService, ...expenseProviders, ExpenseResolver]
})
export class ExpenseModule {
}
