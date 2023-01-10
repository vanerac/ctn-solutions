import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {JwtAuthGuard} from "../auth/jwt.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {Project} from "./project.entity";

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Project})
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Project, isArray: true})
    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Project})
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Project})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(+id, updateProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: Project})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectService.remove(+id);
    }
}
