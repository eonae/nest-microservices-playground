import { ISerializer } from './serializer.interface';

export class DefaultSerializer implements ISerializer {
  public serialize<T> (payload: T): Buffer {
    return Buffer.from(JSON.stringify(payload));
  }
}
