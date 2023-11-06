import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(function(req: Request, res: Response, next: NextFunction) {
    console.log('before', req.url);
    next();
    console.log('after');
  })

  // app.useGlobalInterceptors(new TimeInterceptor())
  // app.useGlobalGuards(new LoginGuard())
  // app.useGlobalPipes(new ValidatePipe());
  // app.useGlobalFilters(new TestFilter());
  await app.listen(3000);
}
bootstrap();
