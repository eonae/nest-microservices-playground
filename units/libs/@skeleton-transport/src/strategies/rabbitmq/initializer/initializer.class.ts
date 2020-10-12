import { Channel } from 'amqplib';
import { EVENTS_EXCHANGE, RPC_EXCHANGE } from '../constants';
import { v4 } from 'uuid';

export interface IClientInitializer {
  initializeClient (): Promise<{ callbackQueue: string }>;
}

export interface IServerInitializer {
  initializeServer (tag: string): Promise<{ consumeQueue: string }>;
}

export class RMQInitializer implements IClientInitializer, IServerInitializer {
  constructor (
    private channel: Channel
  ) { }

  private assertExchanges = async () => {
    await this.channel.assertExchange(EVENTS_EXCHANGE, 'fanout');
    await this.channel.assertExchange(RPC_EXCHANGE, 'direct');
  }

  public initializeClient = async () => {
    await this.assertExchanges();
    const callbackQueue = 'callback_' + v4();
    await this.channel.assertQueue(callbackQueue, { exclusive: true });
    return { callbackQueue };
  }

  public initializeServer = async (tag: string) => {
    await this.assertExchanges();
    const consumeQueue = tag + '_queue';
    console.log('Asserting:', { consumeQueue, EVENTS_EXCHANGE, RPC_EXCHANGE, tag });
    await this.channel.assertQueue(consumeQueue);
    await this.channel.bindQueue(consumeQueue, EVENTS_EXCHANGE, '');
    await this.channel.bindQueue(consumeQueue, RPC_EXCHANGE, tag);
    return { consumeQueue };
  }
}
