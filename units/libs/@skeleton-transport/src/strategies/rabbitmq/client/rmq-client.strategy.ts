import { EVENTS_EXCHANGE, RPC_EXCHANGE } from '../constants';
import { Connection, Channel, connect } from 'amqplib';
import { RMQClientOptions } from './rmq-client.options';
import { ClientStrategy } from '../../client.strategy';
import { RMQInitializer } from '../initializer';
import { ITrace } from '@skeleton/tracing';
import { EventEmitter } from 'events';
import {
  IDeserializer,
  ISerializer,
  DefaultSerializer,
  DefaultDeserializer
} from '../../../serialization';
import { v4 } from 'uuid';

export class RMQClientStrategy implements ClientStrategy {
  private connection: Connection;
  private channel: Channel;
  private responses: EventEmitter;
  private serializer: ISerializer;
  private deserializer: IDeserializer;
  private callbackQueue: string;
  private trace: ITrace;

  constructor (
    private options: RMQClientOptions
  ) {
    this.serializer = options.serializer || new DefaultSerializer();
    this.deserializer = options.deserializer || new DefaultDeserializer();
    this.trace = options.trace || { getId: () => v4() };
    this.responses = new EventEmitter();
  }

  public async connect (): Promise<void> {
    this.connection = await connect(this.options.url);
    this.channel = await this.connection.createChannel();  
    const { callbackQueue } = await new RMQInitializer(this.channel).initializeClient();
    this.callbackQueue = callbackQueue;
    await this.channel.consume(this.callbackQueue, msg => {
      const messageId = msg.properties.messageId;
      this.responses.emit(messageId, msg.content);
      this.channel.ack(msg);
    }, { noAck: false });
  }

  public async close (): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  public send (tag: string, pattern: string, message: any): Promise<any> {
    const messageId = v4();
    const correlationId = this.trace.getId();
    console.log({ tag, pattern, messageId, correlationId });
    return new Promise((resolve, reject) => {
      this.responses.once(
        messageId,
        response => resolve(this.deserializer.deserialize(response))
      );
      setTimeout(() => reject(new Error('timeout')), this.options.timeout);
      const payload = this.serializer.serialize(message);
      const ok = this.channel.publish(RPC_EXCHANGE, tag, payload, {
        messageId,
        correlationId,
        headers: { 'x-pattern': pattern },
        replyTo: this.callbackQueue 
      });
      console.log({ ok });
    });
  }

  public async publish (pattern: string, message: any): Promise<void> {
    const payload = this.serializer.serialize(message);
    const ok = this.channel.publish(EVENTS_EXCHANGE, '', payload, {
      headers: { 'x-pattern': pattern }
    });
    console.log({ ok });
  }
}
