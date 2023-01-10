import {Inject, Injectable} from '@nestjs/common';
import {CreateExpenseDto} from './dto/create-expense.dto';
import {UpdateExpenseDto} from './dto/update-expense.dto';
import {Repository} from "typeorm";
import {Expense} from "./expense.entity";

@Injectable()
export class ExpenseService {

    constructor(
        @Inject('EXPENSE_REPOSITORY')
        private readonly expenseRepository: Repository<Expense>
    ) {
    }

    async create(createExpenseDto: CreateExpenseDto) {
        return this.expenseRepository.save(createExpenseDto);
    }

    async findAll() {
        return this.expenseRepository.find();
    }

    async findOne(id: number) {
        return this.expenseRepository.findOne({
            where: {
                id
            }
        });
    }

    async update(id: number, updateExpenseDto: UpdateExpenseDto) {
        return this.expenseRepository.update(id, updateExpenseDto)
    }

    async remove(id: number) {
        return this.expenseRepository.delete(id);
    }
}
