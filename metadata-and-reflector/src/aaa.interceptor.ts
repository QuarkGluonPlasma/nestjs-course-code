import { Inject } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('interceptor');

    console.log(this.reflector.get('roles', context.getHandler()))
    console.log(this.reflector.get('roles', context.getClass()))

    console.log('getAll', this.reflector.getAll('roles', [context.getHandler(), context.getClass()]));
    console.log('getAllAndMerge', this.reflector.getAllAndMerge('roles', [context.getHandler(), context.getClass()]));
    console.log('getAllAndOverride', this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]));

    return next.handle();
  }
}
