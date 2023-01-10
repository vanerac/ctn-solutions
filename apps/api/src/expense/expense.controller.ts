import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ExpenseService} from './expense.service';
import {CreateExpenseDto} from './dto/create-expense.dto';
import {UpdateExpenseDto} from './dto/update-expense.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {Expense} from "./expense.entity";

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Expense})
    @Post()
    create(@Body() createExpenseDto: CreateExpenseDto) {
        return this.expenseService.create(createExpenseDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Expense, isArray: true})
    @Get()
    findAll() {
        return this.expenseService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Expense})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.expenseService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Expense})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
        return this.expenseService.update(+id, updateExpenseDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Expense})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.expenseService.remove(+id);
    }
}
