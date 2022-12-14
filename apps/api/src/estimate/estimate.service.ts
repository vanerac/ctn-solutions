import {Inject, Injectable} from '@nestjs/common';
import {CreateEstimateDto} from './dto/create-estimate.dto';
import {UpdateEstimateDto} from './dto/update-estimate.dto';
import {Repository} from "typeorm";
import {Estimate} from "./estimate.entity";
import {EstimateField} from "./estimate-field.entity";
import {User} from "../user/user.entity";

@Injectable()
export class EstimateService {

    constructor(
        @Inject('ESTIMATE_REPOSITORY')
        private estimateRepository: Repository<Estimate>,
        @Inject('ESTIMATE_FIELD_REPOSITORY')
        private estimateFieldRepository: Repository<EstimateField>,
    ) {
    }


    async create(createEstimateDto: CreateEstimateDto, user: User) {


        const estimate = this.estimateRepository.create({
            ...createEstimateDto,
            owner: user
        })

        await this.estimateRepository.save(estimate);

        for (const item of createEstimateDto.items) {
            const estimateField = new EstimateField();
            estimateField.title = item.title;
            estimateField.quantity = item.quantity;
            estimateField.unitPrice = item.unitPrice;
            estimateField.tax = item.tax;
            estimateField.discount = item.discount;
            estimateField.description = item.description;
            estimateField.estimate = estimate;

            await this.estimateFieldRepository.save(estimateField);

        }

    }

    async findAll() {
        return this.estimateRepository.find({
            relations:
                [
                    "customer",
                    "items"
                ],
            relationLoadStrategy: "join"
        });
    }

    async findOne(id: number) {
        return this.estimateRepository.findOne(
            {
                where: {id: id},
                relations:
                    [
                        "customer",
                        "items"
                    ],
                relationLoadStrategy: "join"
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
