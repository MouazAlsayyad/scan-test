import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as Joi from 'joi';
import { Microservice3Controller } from './microservice-3.controller';
import { Microservice3Service } from './microservice-3.service';
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
      envFilePath: './apps/microservice-3/.env',
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
  controllers: [Microservice3Controller],
  providers: [Microservice3Service],
})
export class Microservice3Module {}
