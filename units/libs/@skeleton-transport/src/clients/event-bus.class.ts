import { ClientStrategy } from '../strategies';
import { DomainEvent } from '../interfaces';

export class EventBusClient {
  constructor (
    private readonly client: ClientStrategy
  ) { }

  public init = () => this.client.connect();

  public publish = (e: DomainEvent) => this.client.publish(e.pattern, e.payload);
}
