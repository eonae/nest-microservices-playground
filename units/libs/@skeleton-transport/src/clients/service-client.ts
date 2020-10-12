import { ClientStrategy } from '../strategies';
import { Command } from '../interfaces';

export class ServiceClient<TCommand extends Command> {
  constructor (
    private readonly client: ClientStrategy
  ) { }

  public init = () => this.client.connect();
  public close = () => this.client.close();

  public call = (c: TCommand) => this.client.send(c.service, c.pattern, c.payload);
}
