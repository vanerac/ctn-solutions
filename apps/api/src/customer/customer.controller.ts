import {Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CreateCustomerDto} from './dto/create-customer.dto';
import {UpdateCustomerDto} from './dto/update-customer.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Customer} from "./customer.entity";

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Customer})
    @Post()
    create(@Request() req, @Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.create(createCustomerDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Customer, isArray: true})
    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Customer})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Customer})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customerService.update(+id, updateCustomerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerService.remove(+id);
    }
}
