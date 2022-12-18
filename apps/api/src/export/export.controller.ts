import {Controller, Delete, Get, Param, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ExportService} from "./export.service";
import {Export} from "./export.entity";

@ApiTags('export')
@Controller('export')
export class ExportController {
    constructor(private readonly exportService: ExportService) {
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiOkResponse({type: Export})
    // @Post('test')
    // create() {
    //     return this.exportService.text();
    // }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Export, isArray: true})
    @Get()
    findAll() {
        return this.exportService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Export})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.exportService.findOne(+id);
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiOkResponse({type: Estimate})
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateEstimateDto: UpdateEstimateDto) {
    //     return this.exportService.update(+id, updateEstimateDto);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.exportService.remove(+id);
    }


}
