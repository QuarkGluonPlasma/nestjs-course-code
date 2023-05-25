import { AppService } from './app.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable,tap } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {

  constructor(private appService: AppService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(this.appService.getHello());

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
