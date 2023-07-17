import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();

  app.useStaticAssets(join(__dirname, '../uploads'), {prefix: '/uploads'});

  await app.listen(3005);
}
bootstrap();
