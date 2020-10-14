import { Inject, Injectable } from '@nestjs/common';
import { ClientStrategy } from '../strategies';
import { TRANSPORT } from './transport.module';
import { Command } from '../interfaces';
import { Client } from './client.class';

@Injectable()
export class ClientsFactory {
  constructor (
    @Inject(TRANSPORT) private transport: ClientStrategy
  ) { }

  public async create <T extends Command> () {
    const client = new Client<T>(this.transport);
    await client.init();
    return client;
  }
}
