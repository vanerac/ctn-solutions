import {Inject, Injectable} from '@nestjs/common';
import {CreateCustomerDto} from './dto/create-customer.dto';
import {UpdateCustomerDto} from './dto/update-customer.dto';
import {Repository} from "typeorm";
import {Customer} from "./customer.entity";
import {User} from "../user/user.entity";

@Injectable()
export class CustomerService {

    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepository: Repository<Customer>,
    ) {
    }

    create(createCustomerDto: CreateCustomerDto, user: User) {
        const company = this.customerRepository.create({
            ...createCustomerDto,
            user: user
        });

        return this.customerRepository.save(company);

    }

    findAll() {
        return this.customerRepository.find();
    }

    async findOne(id: number) {
        const data = await this.customerRepository.findOne({
            where: {
                id
            },
            select: [
                "email",
                "id",
                "company",
                "firstname",
                "lastname",
                "phone"
            ]
        });

        return data;
    }

    update(id: number, updateCustomerDto: UpdateCustomerDto) {
        return this.customerRepository.update(id, updateCustomerDto);
    }

    remove(id: number) {
        return this.customerRepository.delete(id);
    }
}
