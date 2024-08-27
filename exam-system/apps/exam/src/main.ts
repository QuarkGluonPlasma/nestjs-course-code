import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  await app.listen(3002);
}
bootstrap();
