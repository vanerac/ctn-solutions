import {Inject, Injectable} from '@nestjs/common';
import {CreateEstimateDto} from './dto/create-estimate.dto';
import {UpdateEstimateDto} from './dto/update-estimate.dto';
import {Repository} from "typeorm";
import {Estimate} from "./estimate.entity";
import {EstimateField} from "./estimate-field.entity";

@Injectable()
export class EstimateService {

    constructor(
        @Inject('ESTIMATE_REPOSITORY')
        private estimateRepository: Repository<Estimate>,
        @Inject('ESTIMATE_FIELD_REPOSITORY')
        private estimateFieldRepository: Repository<EstimateField>,
    ) {
    }


    async create(createEstimateDto: CreateEstimateDto) {

        return this.estimateRepository.save(createEstimateDto);

    }

    async findAll() {
        return this.estimateRepository.find();
    }

    async findOne(id: number) {
        return this.estimateRepository.findOne(
            {
                where: {id: id},
            }
        )
    }

    async update(id: number, updateEstimateDto: UpdateEstimateDto) {
        return this.estimateRepository.update(id, updateEstimateDto);
    }

    async remove(id: number) {
        return this.estimateRepository.delete(id);
    }
}
