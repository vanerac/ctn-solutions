import {ApiProperty} from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}
