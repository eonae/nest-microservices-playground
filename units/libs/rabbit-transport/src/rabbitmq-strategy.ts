import { connect, Connection, Channel, ConsumeMessage } from 'amqplib';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { v4 } from 'uuid';

type Callback<T = void> = () => T;

export type ConnectTo = { exchange: string } | { queue: string };

export interface RabbitMQServerOptions {
  url: string;
  connectTo: ConnectTo;
}

export class RabbitMQServer extends Server implements CustomTransportStrategy {
  private server: Connection;
  private channel: Channel;

  public get isInitialized (): boolean {
    return !!this.server;
  }

  constructor(private options: RabbitMQServerOptions) {
    super();
  }

  public async listen (callback: Callback): Promise<void> {
    const queue = await this.initQueue();
    this.channel.consume(queue, async (msg: ConsumeMessage) => {
      const pattern = msg.fields.routingKey;
      console.log('pattern:', pattern);
      const handler = this.getHandlers().get(pattern);
      if (!handler) {
        console.log('handler not found!');
        this.channel.ack(msg);
        return;
      }
      console.log('Handler found!');
      const result = await (await handler(msg)).toPromise();
      console.log('result', result);
      const buf = Buffer.from(JSON.stringify(result));
      const { replyTo, messageId } = msg.properties;
      console.log('debug:', { result, replyTo, messageId })
      if (result && replyTo && messageId) {
        console.log('sending result to callback queue:', replyTo);
        const ok = this.channel.sendToQueue(replyTo, buf, { messageId });
        console.log(ok);
      }
      this.channel.ack(msg);
    }, {
      noAck: false,
    });
    callback();
  }

  private async initQueue(): Promise<string> {
    this.server = await connect(this.options.url);
    this.channel = await this.server.createChannel();
    const connectTo = this.options.connectTo;
    if ('queue' in connectTo) {
      await this.channel.assertQueue(connectTo.queue, {});
      return connectTo.queue;
    } else {
      const exclusiveQueue = 'ex_' + v4();
      await this.channel.assertExchange(connectTo.exchange, 'fanout', {});
      await this.channel.assertQueue(exclusiveQueue, {
        exclusive: true
      });
      await this.channel.bindQueue(exclusiveQueue, connectTo.exchange, '');
      return exclusiveQueue;
    }
  }

  public async close (): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.server) await this.server.close();
  }
}
