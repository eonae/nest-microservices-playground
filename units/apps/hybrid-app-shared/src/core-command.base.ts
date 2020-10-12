import { Command } from '@skeleton/transport';
import { SERVICE_TAG } from './constants';

export abstract class CoreCommand implements Command {
  public readonly service = SERVICE_TAG;

  constructor (
    public readonly pattern: string,
    public readonly payload: any
    ) { }
}
