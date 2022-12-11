import {Body, Controller, Param} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {TypedBody, TypedRoute} from "nestia-helper";
import {User} from "./user.entity";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {DeleteResult} from "typeorm";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiResponse({type: User})
    @TypedRoute.Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiResponse({type: User})
    @TypedRoute.Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiResponse({type: User})
    @TypedRoute.Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @ApiResponse({type: User})
    @TypedRoute.Patch(':id')
    update(@Param('id') id: number, @TypedBody() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiResponse({type: DeleteResult})
    @TypedRoute.Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
