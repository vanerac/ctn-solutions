import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDTO} from './dto/register-d-t.o';
import {LoginDTO} from "./dto/login-d-t.o";
import {LocalAuthGuard} from "./local.guard";
import {JwtAuthGuard} from "./jwt.guard";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {LoginResponse} from "./dto/loginResponse";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    register(@Body() registerDTO: RegisterDTO) {
        return this.authService.register(registerDTO);
    }

    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({type: LoginResponse})
    @Post('login')
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return req.user
    }


}
