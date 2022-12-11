import {Inject, Injectable} from '@nestjs/common';
import {RegisterDTO} from './dto/register-d-t.o';
import {LoginDTO} from './dto/login-d-t.o';
import {Repository} from "typeorm";
import {User} from "../user/user.entity";
import {JwtService} from "@nestjs/jwt";

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {
    }

    async validateUserBasic(email: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        console.log(user)

        if (bcrypt.compareSync(pass, user.password)) {
            const {password, ...result} = user;
            return result;
        }

        console.log('nope')
        return null;
    }

    async register(createAuthDto: RegisterDTO) {
        const user = await this.userRepository.create({
            ...createAuthDto,
        });

        user.password = bcrypt.hashSync(user.password, 10);

        await this.userRepository.save(user);

        return user;
    }

    async login(loginDTO: LoginDTO) {
        const {password, ...user} = await this.userRepository.findOne({
            where: {
                email: loginDTO.email
            }
        });

        return {
            access_token: this.jwtService.sign(user),
        };

    }
}
