import {ApiProperty} from "@nestjs/swagger";

export class ChangePasswordDTO {
    @ApiProperty()
    oldpassword: string;

    @ApiProperty()
    newpassword: string;

    @ApiProperty()
    confirmpassword: string;
}
