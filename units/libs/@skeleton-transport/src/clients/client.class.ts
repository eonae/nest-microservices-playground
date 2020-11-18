import { ClientStrategy } from '../strategies';
import { Command } from '../interfaces';

export class Client<TCommand extends Command> {
  constructor (
    private readonly transport: ClientStrategy
  ) { }

  public init = (): Promise<void> => this.transport.connect();

  public close = (): Promise<void> => this.transport.close();

  public call<TOutput> (command: TCommand): Promise<TOutput> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { service, pattern, payload } = command;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.transport.send<any, TOutput>(service, pattern, payload);
  }
}
