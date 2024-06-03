import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    @Inject()
    private userService: UserService;

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findOne(username);

        if(!user) {
            throw new UnauthorizedException('用户不存在');
        }
        if(user.password !== pass) {
            throw new UnauthorizedException('密码错误');
        }

        const { password, ...result } = user;
        return result;
    }
}
