import { Connection, Channel, connect, Options } from 'amqplib';
import { EventEmitter } from 'events';
import { v4 } from 'uuid';
import {
  DefaultDeserializer,
  DefaultSerializer,
  DefaultTrace,
  IDeserializer,
  ISerializer,
  ITrace,
  RMQClientOptions
} from './support';
import { Stopwatch } from '@libs/common';

export class RMQClient<TIn, TOut> {
  private connection: Connection;
  private channel: Channel;
  private responseEmitter: EventEmitter;
  private serializer: ISerializer<TIn>;
  private deserializer: IDeserializer<TOut>;
  private callbackQueue: string;
  private trace: ITrace;

  get isInitialized (): boolean {
    return !!this.connection;
  }

  constructor (private options: RMQClientOptions<TIn, TOut>) {
    this.serializer = options.serializer || new DefaultSerializer();
    this.deserializer = options.deserializer || new DefaultDeserializer();
    this.trace = options.trace || new DefaultTrace();
    this.responseEmitter = new EventEmitter();
    this.callbackQueue = 'cb_' + v4();
  }

  public async connect (): Promise<void> {
    const exchangeOptions: Options.AssertExchange = {};
    const callbackQueueOptions: Options.AssertQueue = { exclusive: true };
    this.connection = await connect(this.options.url);
    this.channel = await this.connection.createChannel();
    // Or maybe check queue
    await this.channel.assertExchange(this.options.exchange, 'fanout', exchangeOptions);
    await this.channel.assertQueue(this.callbackQueue, callbackQueueOptions);
    console.log(this.callbackQueue);
    await this.channel.consume(this.callbackQueue, msg => {
      console.log('callback');
      const messageId = msg.properties.messageId;
      this.responseEmitter.emit(messageId, msg.content);
      this.channel.ack(msg);
    }, { noAck: false });
  }

  public async close (): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  public send (message: TIn): Promise<TOut> {
    const messageId = v4();
    const correlationId = this.trace.getId();
    console.log({ messageId, correlationId });
    return new Promise((resolve, reject) => {
      this.responseEmitter.once(
        messageId,
        response => resolve(this.deserializer.deserialize(response))
      );
      setTimeout(() => reject(new Error('timeout')), this.options.timeout);
      const payload = this.serializer.serialize(message);
      const pub = this.channel.publish(this.options.exchange, 'test', payload, {
        messageId,
        correlationId,
        replyTo: this.callbackQueue,
      });
      console.log(pub);
    });
  }

  public async publish (message: TIn): Promise<void> {
    const payload = this.serializer.serialize(message);
    this.channel.publish(this.options.exchange, '', payload);
  }
}
