import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import configuration from "../configuration";
import {User} from "../user/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configuration.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return payload as Partial<User>;
    }
}
