import { Controller, Get } from '@nestjs/common';
import { Microservice1Service } from './microservice-1.service';

@Controller()
export class Microservice1Controller {
  constructor(private readonly microservice1Service: Microservice1Service) {}

  @Get()
  async getHello() {
    // await this.microservice1Service.publishEvent();
    return this.microservice1Service.getHello();
  }
}
