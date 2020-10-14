import { Inject, Injectable } from '@nestjs/common';
import { ClientStrategy } from '../strategies';
import { DomainEvent } from '../interfaces';
import { TRANSPORT } from './transport.module';

@Injectable()
export class EventBusClient {
  constructor (
    @Inject(TRANSPORT) private transport: ClientStrategy
  ) { }

  public init = () => this.transport.connect();

  public close = () => this.transport.close();

  public publish = (e: DomainEvent) => this.transport.publish(e.pattern, e.payload);
}
