import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {

    @InjectEntityManager()
    private entityManager: EntityManager;

    async login(loginUserDto: LoginUserDto) {
        const user = await this.entityManager.findOne(User, {
            where: {
                username: loginUserDto.username
            }
        });

        if(!user) {
            throw new HttpException('用户不存在', HttpStatus.OK);
        }

        if(user.password !== loginUserDto.password) {
            throw new HttpException('密码错误', HttpStatus.OK);
        }

        return user;
    }

    async findUserById(userId: number) {
        return await this.entityManager.findOne(User, {
            where: {
                id: userId
            }
        });
    }
}
