import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  EXCHANGE,
  QUEUE_1,
  QUEUE_2,
  ROUTING_KEY_1,
  ROUTING_KEY_2,
  messageDTO,
} from '@app/common';

@Injectable()
export class Microservice3Service {
  private readonly logger = new Logger(Microservice3Service.name);
  private lastTenMessages: messageDTO[] = [];
  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: ROUTING_KEY_1,
    queue: QUEUE_1,
  })
  public async pubSubHandler(msg: messageDTO) {
    this.logger.log(`Received pub/sub message: ${JSON.stringify(msg)}`);
  }

  @RabbitSubscribe({
    exchange: EXCHANGE,
    routingKey: ROUTING_KEY_2,
    queue: QUEUE_2,
  })
  public async sortLastTen(msg: messageDTO[]) {
    this.lastTenMessages = msg;
  }

  getLastTen() {
    return this.lastTenMessages;
  }
}
