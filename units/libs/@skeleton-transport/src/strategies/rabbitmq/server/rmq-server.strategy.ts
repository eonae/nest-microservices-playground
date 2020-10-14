import {
  connect, Connection, Channel, ConsumeMessage
} from 'amqplib';
import { Server, CustomTransportStrategy, MessageHandler } from '@nestjs/microservices';
import { catchError, map } from 'rxjs/operators';
import { Result } from '@libs/common';
import { of } from 'rxjs';
import { RMQServerOptions } from './rmq-server.options';
import { RMQInitializer } from '../initializer';
import { DefaultSerializer } from '../../../serialization';

export class RMQServerStrategy extends Server implements CustomTransportStrategy {
  private server: Connection;

  private channel: Channel;

  public get isInitialized (): boolean {
    return !!this.server;
  }

  constructor (private options: RMQServerOptions) {
    super();
  }

  public async listen (callback: () => void): Promise<void> {
    const { consumeQueue } = await this.init();
    this.channel.consume(consumeQueue, async (msg: ConsumeMessage) => {
      const { pattern, replyTo, messageId } = this.parseMetadata(msg);
      const handler = this.findHandler(pattern);
      if (handler) {
        const result = await this.executeHandler(handler, msg);
        if (result && replyTo && messageId) {
          this.sendCallback(replyTo, messageId, result);
        }
      }
      this.channel.ack(msg);
    }, { noAck: false });
    callback();
  }

  public async close (): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.server) await this.server.close();
  }

  private async init (): Promise<{ consumeQueue: string }> {
    this.server = await connect(this.options.url);
    this.channel = await this.server.createChannel();
    return new RMQInitializer(this.channel).initializeServer(this.options.tag);
  }

  private findHandler (pattern: string): MessageHandler<any, any, any> {
    const handler = this.getHandlers().get(pattern);
    console.log(`Handler for pattern <${pattern}>${handler}` ? 'found!' : 'not found!');
    return handler;
  }

  // Выполняет и оборачивает результат в объект Result
  private async executeHandler (
    handler: MessageHandler<any, any, any>,
    message: ConsumeMessage
  ): Promise<any> {
    console.log('Stream aqquired');
    return (await handler(message)).pipe(
      map(v => Result.data(v)),
      catchError(err => of(Result.error(err)))
    ).toPromise();
  }

  private parseMetadata (msg: ConsumeMessage) {
    const metadata = {
      pattern: msg.properties.headers['x-pattern'],
      replyTo: msg.properties.replyTo,
      messageId: msg.properties.messageId
    };
    console.log('Message metadata:', metadata);
    return metadata;
  }

  private sendCallback (replyTo: string, messageId: string, result: any): void {
    console.log('Sending callback');
    const buf = new DefaultSerializer().serialize(result);
    this.channel.sendToQueue(replyTo, buf, { messageId });
  }
}
