import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CompanyService} from './company.service';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Company} from "./entities/company.entity";
import {JwtAuthGuard} from "../auth/jwt.guard";

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Company})
    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Company, isArray: true})
    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Company})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Company})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.companyService.update(+id, updateCompanyDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.remove(+id);
    }
}
