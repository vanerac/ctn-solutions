import {DataSource} from 'typeorm';
import {Expense} from "./expense.entity";

export const expenseProviders = [
    {
        provide: 'EXPENSE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Expense),
        inject: ['DATA_SOURCE'],
    },

];
