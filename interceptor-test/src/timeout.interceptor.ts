import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError(err => {
        if(err instanceof TimeoutError) {
          return throwError(() => new HttpException('xxx', HttpStatus.FOUND));
          // return throwError(() => new RequestTimeoutException())
        }
        return throwError(() => err);
      })
    )
  }
}
