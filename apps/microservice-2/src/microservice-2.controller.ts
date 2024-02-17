import { Controller, Get } from '@nestjs/common';
import { Microservice2Service } from './microservice-2.service';

@Controller()
export class Microservice2Controller {
  constructor(private readonly microservice2Service: Microservice2Service) {}
  @Get()
  getRecentEvents() {
    return this.microservice2Service.getRecentEvents();
  }
}
