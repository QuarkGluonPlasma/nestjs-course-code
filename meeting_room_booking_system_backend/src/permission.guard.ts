import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionGuard implements CanActivate {

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if(!request.user) {
      return true;
    }

    const permissions = request.user.permissions;
  
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('require-permission', [
      context.getClass(),
      context.getHandler()
    ])

    if(!requiredPermissions) {
      return true;
    }
  
    for(let i = 0; i < requiredPermissions.length; i++) {
      const curPermission = requiredPermissions[i];
      const found = permissions.find(item => item.code === curPermission);
      if(!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
