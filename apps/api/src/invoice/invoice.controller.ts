import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {InvoiceService} from './invoice.service';
import {CreateInvoiceDto} from './dto/create-invoice.dto';
import {UpdateInvoiceDto} from './dto/update-invoice.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Invoice} from "./invoice.entity";

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Invoice})
    @Post()
    create(@Body() createInvoiceDto: CreateInvoiceDto, @Req() req) {
        return this.invoiceService.create(createInvoiceDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Invoice, isArray: true})
    @Get()
    findAll() {
        return this.invoiceService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Invoice})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoiceService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Invoice})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
        return this.invoiceService.update(+id, updateInvoiceDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.invoiceService.remove(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/export')
    export(@Param('id') id: string, @Req() req) {
        return this.invoiceService.export(+id);
    }
}
