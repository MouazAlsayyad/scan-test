import { Module } from '@nestjs/common';
import { Microservice1Controller } from './microservice-1.controller';
import { Microservice1Service } from './microservice-1.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_EXCHANGE_M1_QUEUE: Joi.string().required(),
        RABBIT_EXCHANGE_TYPE: Joi.string().required(),
      }),
      envFilePath: './apps/microservice-1/.env',
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: configService.get<string>('RABBIT_EXCHANGE_M1_QUEUE'),
            type: configService.get<string>('RABBIT_EXCHANGE_TYPE'),
          },
        ],
        uri: configService.get<string>('RABBIT_MQ_URI'),
        connectionInitOptions: { wait: false },
        enableControllerDiscovery: true,
      }),
    }),
  ],
  controllers: [Microservice1Controller],
  providers: [Microservice1Service],
})
export class Microservice1Module {}
