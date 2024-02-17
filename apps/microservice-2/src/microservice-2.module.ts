import { Module } from '@nestjs/common';
import { Microservice2Controller } from './microservice-2.controller';
import { Microservice2Service } from './microservice-2.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Msg, MsgSchema } from './schemas/msg.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MsgRepository } from './msg.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_EXCHANGE_M1_QUEUE: Joi.string().required(),
        RABBIT_EXCHANGE_TYPE: Joi.string().required(),
      }),
      envFilePath: './apps/microservice-2/.env',
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
    DatabaseModule,
    MongooseModule.forFeature([{ name: Msg.name, schema: MsgSchema }]),
  ],
  controllers: [Microservice2Controller],
  providers: [Microservice2Service, MsgRepository],
})
export class Microservice2Module {}
