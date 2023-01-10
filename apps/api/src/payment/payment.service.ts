import {Inject, Injectable} from '@nestjs/common';
import {CreatePaymentDto} from './dto/create-payment.dto';
import {UpdatePaymentDto} from './dto/update-payment.dto';
import {Repository} from "typeorm";
import {Payment} from "./payment.entity";

@Injectable()
export class PaymentService {

    constructor(
        @Inject('PAYMENT_REPOSITORY')
        private paymentRepository: Repository<Payment>
    ) {
    }


    async create(createPaymentDto: CreatePaymentDto) {
        return this.paymentRepository.save(createPaymentDto);
    }

    async findAll() {
        return this.paymentRepository.find();
    }

    async findOne(id: number) {
        return this.paymentRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return this.paymentRepository.update(id, updatePaymentDto);
    }

    async remove(id: number) {
        return this.paymentRepository.delete(id);
    }
}
