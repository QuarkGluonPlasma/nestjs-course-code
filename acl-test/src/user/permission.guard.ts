import { RedisService } from './../redis/redis.service';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(UserService) 
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;
    if(!user) {
      throw new UnauthorizedException('用户未登录');
    }

    let permissions = await this.redisService.listGet(`user_${user.username}_permissions`); 

    if(permissions.length === 0) {
      const foundUser = await this.userService.findByUsername(user.username);
      permissions = foundUser.permissions.map(item => item.name);

      this.redisService.listSet(`user_${user.username}_permissions`, permissions, 60 * 30)
    }

    const permission = this.reflector.get('permission', context.getHandler());

    if(permissions.some(item => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
