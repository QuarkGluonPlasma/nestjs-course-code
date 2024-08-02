import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true}));

  app.enableCors({
    exposedHeaders: ['Token']
  });
  await app.listen(3005);
}
bootstrap();
