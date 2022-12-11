import {PartialType} from '@nestjs/swagger';
import {RegisterDTO} from './register-d-t.o';

export class LoginDTO extends PartialType(RegisterDTO) {
}
