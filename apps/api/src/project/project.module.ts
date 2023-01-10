import {Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';
import {DatabaseModule} from "../database/database.module";
import {projectProviders} from "./project.provider";
import ProjectResolver from "./project.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "./project.entity";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Project])],
    controllers: [ProjectController],
    providers: [ProjectService, ...projectProviders, ProjectResolver]
})
export class ProjectModule {
}
