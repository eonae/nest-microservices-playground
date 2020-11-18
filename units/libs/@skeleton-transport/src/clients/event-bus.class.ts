import { Inject, Injectable } from '@nestjs/common';
import { ClientStrategy } from '../strategies';
import { DomainEvent } from '../interfaces';
import { TRANSPORT } from './constants';

@Injectable()
export class EventBusClient {
  constructor (
    @Inject(TRANSPORT) private transport: ClientStrategy
  ) { }

  public init = (): Promise<void> => this.transport.connect();

  public close = (): Promise<void> => this.transport.close();

  public publish<T> (event: DomainEvent<T>): Promise<void> {
    const { pattern, payload } = event;
    return this.transport.publish(pattern, payload);
  }
}
