import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { EXCHANGE, ROUTING_KEY_1, messageDTO } from '@app/common';

@Injectable()
export class Microservice1Service {
  private logger = new Logger(Microservice1Service.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}
  getHello() {
    setInterval(() => {
      this.publishEvent();
    }, 1000);
  }

  async publishEvent() {
    this.amqpConnection.publish<messageDTO>(EXCHANGE, ROUTING_KEY_1, {
      name: `name`,
      description: 'description',
    });
  }
}
