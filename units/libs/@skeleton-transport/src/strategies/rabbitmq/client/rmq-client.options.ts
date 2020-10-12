import { IDeserializer, ISerializer } from '../../../serialization';
import { ITrace } from '../../../tracing';

export interface RMQClientOptions {
  url: string;
  timeout?: number;
  trace?: ITrace;
  serializer?: ISerializer;
  deserializer?: IDeserializer;
}
