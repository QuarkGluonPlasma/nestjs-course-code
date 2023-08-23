import { Permission } from './entities/permission.entity';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';
import { Like, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserListVo } from './vo/user-list.vo';

@Injectable()
export class UserService {
    private logger = new Logger();

    @InjectRepository(User)
    private userRepository: Repository<User>;

    @InjectRepository(Role)
    private roleRepository: Repository<Role>;

    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>;

    @Inject(RedisService)
    private redisService: RedisService;

    async initData() {
        const user1 = new User();
        user1.username = "zhangsan";
        user1.password = md5("111111");
        user1.email = "xxx@xx.com";
        user1.isAdmin = true;
        user1.nickName = '张三';
        user1.phoneNumber = '13233323333';
        
        const user2 = new User();
        user2.username = 'lisi';
        user2.password = md5("222222");
        user2.email = "yy@yy.com";
        user2.nickName = '李四';
    
        const role1 = new Role();
        role1.name = '管理员';
        
        const role2 = new Role();
        role2.name = '普通用户';

        const permission1 = new Permission();
        permission1.code = 'ccc';
        permission1.description = '访问 ccc 接口';

        const permission2 = new Permission();
        permission2.code = 'ddd';
        permission2.description = '访问 ddd 接口';

        user1.roles = [role1];
        user2.roles = [role2];

        role1.permissions = [permission1, permission2];
        role2.permissions = [permission1];

        await this.permissionRepository.save([permission1, permission2]);
        await this.roleRepository.save([role1, role2]);
        await this.userRepository.save([user1, user2]);
    }

    async register(user: RegisterUserDto) {
        const captcha = await this.redisService.get(`captcha_${user.email}`);

        console.log(`captcha_${user.email}`, captcha);
        if(!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }

        if(user.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.userRepository.findOneBy({
          username: user.username
        });
        if(foundUser) {
          throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
        }
    
        const newUser = new User();
        newUser.username = user.username;
        newUser.password = md5(user.password);
        newUser.email = user.email;
        newUser.nickName = user.nickName;
    
        try {
          await this.userRepository.save(newUser);
          return '注册成功';
        } catch(e) {
          this.logger.error(e, UserService);
          return '注册失败';
        }
    }

    async login(loginUserDto: LoginUserDto, isAdmin: boolean) {
        const user = await this.userRepository.findOne({
            where: {
                username: loginUserDto.username,
                isAdmin
            },
            relations: [ 'roles', 'roles.permissions']
        });

        if(!user) {
            throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
        }

        if(user.password !== md5(loginUserDto.password)) {
            throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
        }

        const vo = new LoginUserVo();
        vo.userInfo = {
            id: user.id,
            username: user.username,
            nickName: user.nickName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            headPic: user.headPic,
            createTime: user.createTime.getTime(),
            isFrozen: user.isFrozen,
            isAdmin: user.isAdmin,
            roles: user.roles.map(item => item.name),
            permissions: user.roles.reduce((arr, item) => {
                item.permissions.forEach(permission => {
                    if(arr.indexOf(permission) === -1) {
                        arr.push(permission);
                    }
                })
                return arr;
            }, [])
        }
        return vo;
    }

    async findUserById(userId: number, isAdmin: boolean) {
        const user =  await this.userRepository.findOne({
            where: {
                id: userId,
                isAdmin
            },
            relations: [ 'roles', 'roles.permissions']
        });

        return {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            email: user.email,
            roles: user.roles.map(item => item.name),
            permissions: user.roles.reduce((arr, item) => {
                item.permissions.forEach(permission => {
                    if(arr.indexOf(permission) === -1) {
                        arr.push(permission);
                    }
                })
                return arr;
            }, [])
        }
    }

    async findUserDetailById(userId: number) {
        const user =  await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        return user;
    }

    async updatePassword(passwordDto: UpdateUserPasswordDto) {
        const captcha = await this.redisService.get(`update_password_captcha_${passwordDto.email}`);

        if(!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }

        if(passwordDto.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.userRepository.findOneBy({
          username: passwordDto.username
        });

        if(foundUser.email !== passwordDto.email) {
            throw new HttpException('邮箱不正确', HttpStatus.BAD_REQUEST);
        }

        foundUser.password = md5(passwordDto.password);
            
        try {
          await this.userRepository.save(foundUser);
          return '密码修改成功';
        } catch(e) {
          this.logger.error(e, UserService);
          return '密码修改失败';
        }
    }

    async update(userId: number, updateUserDto: UpdateUserDto) {
        const captcha = await this.redisService.get(`update_user_captcha_${updateUserDto.email}`);

        if(!captcha) {
            throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
        }

        if(updateUserDto.captcha !== captcha) {
            throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
        }

        const foundUser = await this.userRepository.findOneBy({
          id: userId
        });

        if(updateUserDto.nickName) {
            foundUser.nickName = updateUserDto.nickName;
        }
        if(updateUserDto.headPic) {
            foundUser.headPic = updateUserDto.headPic;
        }
            
        try {
          await this.userRepository.save(foundUser);
          return '用户信息修改成功';
        } catch(e) {
          this.logger.error(e, UserService);
          return '用户信息修改成功';
        }
    }
  
    async freezeUserById(id: number) {
        const user = await this.userRepository.findOneBy({
            id
        });

        user.isFrozen = true;

        await this.userRepository.save(user);
    }

    async findUsersByPage(pageNo: number, pageSize: number) {
        const skipCount = (pageNo - 1) * pageSize;

        const [users, totalCount] = await this.userRepository.findAndCount({
            select: ['id', 'username', 'nickName', 'email', 'phoneNumber', 'isFrozen', 'headPic', 'createTime'],
            skip: skipCount,
            take: pageSize
        });

        return {
            users,
            totalCount
        }
    }

    async findUsers(username: string, nickName: string, email: string, pageNo: number, pageSize: number) {
        const skipCount = (pageNo - 1) * pageSize;

        const condition: Record<string, any> = {};

        if(username) {
            condition.username = Like(`%${username}%`);   
        }
        if(nickName) {
            condition.nickName = Like(`%${nickName}%`); 
        }
        if(email) {
            condition.email = Like(`%${email}%`); 
        }

        const [users, totalCount] = await this.userRepository.findAndCount({
            select: ['id', 'username', 'nickName', 'email', 'phoneNumber', 'isFrozen', 'headPic', 'createTime'],
            skip: skipCount,
            take: pageSize,
            where: condition
        });

        const vo = new UserListVo();

        vo.users = users;
        vo.totalCount = totalCount;
        return vo;
    }
}
