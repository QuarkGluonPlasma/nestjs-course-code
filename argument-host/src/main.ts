import { NestFactory } from '@nestjs/core';
import { AaaFilter } from './aaa.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AaaFilter());
  await app.listen(3000);
}
bootstrap();
