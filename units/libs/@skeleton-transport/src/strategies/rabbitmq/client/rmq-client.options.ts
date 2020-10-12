import { IDeserializer, ISerializer } from '../../../serialization';
import { ITrace } from '@skeleton/tracing';

export interface RMQClientOptions {
  url: string;
  timeout?: number;
  trace?: ITrace;
  serializer?: ISerializer;
  deserializer?: IDeserializer;
}
