import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Msg } from './schemas/msg.schema';

@Injectable()
export class MsgRepository extends AbstractRepository<Msg> {
  protected readonly logger = new Logger(MsgRepository.name);

  constructor(
    @InjectModel(Msg.name) mesModel: Model<Msg>,
    @InjectConnection() connection: Connection,
  ) {
    super(mesModel, connection);
  }
}
