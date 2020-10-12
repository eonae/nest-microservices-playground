import { IDeserializer } from './deserializer.interface';

export class DefaultDeserializer implements IDeserializer {
  public deserialize<T> (buf: Buffer): T {
    return JSON.parse(buf.toString('utf-8'));
  }
}
