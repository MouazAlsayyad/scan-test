import { NestFactory } from '@nestjs/core';
import { Microservice2Module } from './microservice-2.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(Microservice2Module);
  app.connectMicroservice(Microservice2Module);
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
