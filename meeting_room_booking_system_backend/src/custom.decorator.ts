import { SetMetadata } from "@nestjs/common";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from "express";

export const  RequireLogin = () => SetMetadata('require-login', true);

export const  RequirePermission = (...permissions: string[]) => SetMetadata('require-permission', permissions);

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if(!request.user) {
        return null;
    }
    return data ? request.user[data] : request.user;
  },
)