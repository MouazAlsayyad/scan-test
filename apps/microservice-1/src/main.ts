import { NestFactory } from '@nestjs/core';
import { Microservice1Module } from './microservice-1.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(Microservice1Module);
  app.connectMicroservice(Microservice1Module);
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
