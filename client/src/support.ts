import { v4 } from 'uuid';

export interface ITrace {
  getId(): string;
}

export class DefaultTrace implements ITrace {
  getId = () => v4();
}

export interface RMQClientOptions<TIn, TOut> {
  url: string;
  exchange: string;
  timeout: number;
  trace?: ITrace;
  serializer?: ISerializer<TIn>;
  deserializer?: IDeserializer<TOut>;
}

export interface ISerializer<T> {
  serialize (payload: T): Buffer;
}

export interface IDeserializer<T> {
  deserialize (buf: Buffer): T;
}

export class DefaultSerializer<T> implements ISerializer<T> {
  public serialize (payload: T): Buffer {
    return Buffer.from(JSON.stringify(payload));
  }
}

export class DefaultDeserializer<T> implements IDeserializer<T> {
  public deserialize (buf: Buffer): T {
    return JSON.parse(buf.toString('utf-8'));
  }
}
