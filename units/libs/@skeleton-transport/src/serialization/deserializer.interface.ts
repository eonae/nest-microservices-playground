export interface IDeserializer {
  deserialize<T> (buf: Buffer): T;
}