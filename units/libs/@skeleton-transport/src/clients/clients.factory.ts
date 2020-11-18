import { Inject, Injectable } from '@nestjs/common';
import { ClientStrategy } from '../strategies';
import { Command } from '../interfaces';
import { Client } from './client.class';
import { TRANSPORT } from './constants';

@Injectable()
export class ClientsFactory {
  constructor (
    @Inject(TRANSPORT) private transport: ClientStrategy
  ) { }

  public async create <T extends Command> (): Promise<Client<T>> {
    const client = new Client<T>(this.transport);
    await client.init();
    return client;
  }
}
