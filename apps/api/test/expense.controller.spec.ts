import {Test, TestingModule} from '@nestjs/testing';
import {ExpenseController} from '../src/expense/expense.controller';
import {ExpenseService} from '../src/expense/expense.service';

describe('ExpenseController', () => {
    let controller: ExpenseController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExpenseController],
            providers: [ExpenseService],
        }).compile();

        controller = module.get<ExpenseController>(ExpenseController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
