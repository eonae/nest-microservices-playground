import { Command } from '@skeleton/transport';
import { SERVICE_TAG } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class CoreCommand<TPayload = any> implements Command {
  public readonly service = SERVICE_TAG;

  constructor (
    public readonly pattern: string,
    public readonly payload: TPayload
  ) { }
}
