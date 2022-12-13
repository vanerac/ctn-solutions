import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {EstimateService} from './estimate.service';
import {CreateEstimateDto} from './dto/create-estimate.dto';
import {UpdateEstimateDto} from './dto/update-estimate.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Estimate} from "./estimate.entity";

@ApiTags('estimate')
@Controller('estimate')
export class EstimateController {
    constructor(private readonly estimateService: EstimateService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Estimate})
    @Post()
    create(@Body() createEstimateDto: CreateEstimateDto) {
        return this.estimateService.create(createEstimateDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Estimate, isArray: true})
    @Get()
    findAll() {
        return this.estimateService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Estimate})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.estimateService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Estimate})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEstimateDto: UpdateEstimateDto) {
        return this.estimateService.update(+id, updateEstimateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.estimateService.remove(+id);
    }
}
