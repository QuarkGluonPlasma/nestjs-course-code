import { NestFactory } from '@nestjs/core';
import { App2Module } from './app2.module';

async function bootstrap() {
  const app = await NestFactory.create(App2Module);
  await app.listen(3000);
}
bootstrap();
