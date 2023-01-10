import {Inject, Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {Project} from "./project.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProjectService {

    constructor(
        @Inject('PROJECT_REPOSITORY')
        private projectRepository: Repository<Project>,
    ) {
    }

    async create(createProjectDto: CreateProjectDto) {
        return this.projectRepository.save(createProjectDto);
    }

    async findAll() {
        return this.projectRepository.find();
    }

    async findOne(id: number) {
        return this.projectRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        return this.projectRepository.update(id, updateProjectDto);
    }

    async remove(id: number) {
        return this.projectRepository.delete(id);
    }
}
