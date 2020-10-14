import { ClientStrategy } from '../strategies';
import { Command } from '../interfaces';

export class Client<TCommand extends Command> {
  constructor (
    private readonly transport: ClientStrategy
  ) { }

  public init = () => this.transport.connect();

  public close = () => this.transport.close();

  public call = (c: TCommand) => this.transport.send(c.service, c.pattern, c.payload);
}
