import {Inject, Injectable} from '@nestjs/common';
import {CreateCompanyDto} from './dto/create-company.dto';
import {UpdateCompanyDto} from './dto/update-company.dto';
import {Repository} from "typeorm";
import {Company} from "./company.entity";

@Injectable()
export class CompanyService {

    constructor(
        @Inject('COMPANY_REPOSITORY')
        private companyRepository: Repository<Company>,
    ) {
    }

    async create(createCompanyDto: CreateCompanyDto) {
        const company = await this.companyRepository.create({...createCompanyDto});

        return this.companyRepository.save(company);
    }

    findAll() {
        return this.companyRepository.find();
    }

    async findOne(id: number) {
        return await this.companyRepository.findOne({
            where: {
                id
            }
        })
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto) {
        return this.companyRepository.update(id, updateCompanyDto);
    }

    remove(id: number) {
        return this.companyRepository.delete(id);
    }
}
