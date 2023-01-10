import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {CreatePaymentDto} from './dto/create-payment.dto';
import {UpdatePaymentDto} from './dto/update-payment.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {Payment} from "./payment.entity";

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Payment})
    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Payment, isArray: true})
    @Get()
    findAll() {
        return this.paymentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Payment})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Payment})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentService.update(+id, updatePaymentDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Payment})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentService.remove(+id);
    }
}
