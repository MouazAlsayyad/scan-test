import {
  EXCHANGE,
  QUEUE_1,
  ROUTING_KEY_1,
  ROUTING_KEY_2,
  messageDTO,
} from '@app/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { MsgRepository } from './msg.repository';
import { Msg } from './schemas/msg.schema';

@Injectable()
export class Microservice2Service {
  private readonly logger = new Logger(Microservice2Service.name);
  constructor(
    private readonly msgRepository: MsgRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async getRecentEvents(): Promise<Msg[]> {
    return this.msgRepository.findLastTen({});
  }

  async publishLastTenEvent() {
    this.amqpConnection.publish<messageDTO[]>(
      EXCHANGE,
      ROUTING_KEY_2,
      await this.msgRepository.findLastTen({}),
    );
  }

  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: ROUTING_KEY_1,
    queue: QUEUE_1,
  })
  public async pubSubHandler(msg: messageDTO) {
    const session = await this.msgRepository.startTransaction();
    try {
      await this.msgRepository.create(
        { name: msg.name, description: msg.description, createdAt: new Date() },
        { session },
      );
      await session.commitTransaction();
      await this.publishLastTenEvent();
    } catch (err) {
      await session.abortTransaction();
      // throw err;
      this.logger.log(`Error msg: ${JSON.stringify(msg)} don't save`);
    }
  }
}
