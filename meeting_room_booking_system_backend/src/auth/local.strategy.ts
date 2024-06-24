import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    @Inject(UserService)
    private userService: UserService;

    async validate(username: string, password: string) {
        const dto = new LoginUserDto();
        dto.username = username;
        dto.password = password;

        const user = await this.userService.login(dto, false);
        return user;
    }
}