import { Controller, Get } from '@nestjs/common';
import { Microservice3Service } from './microservice-3.service';

@Controller()
export class Microservice3Controller {
  constructor(private readonly microservice3Service: Microservice3Service) {}

  @Get()
  getLastTen() {
    return this.microservice3Service.getLastTen();
  }
}
