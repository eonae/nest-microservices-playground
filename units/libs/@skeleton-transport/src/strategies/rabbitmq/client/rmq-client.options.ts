import { ITrace } from '@skeleton/tracing';
import { IDeserializer, ISerializer } from '../../../serialization';

export interface RMQClientOptions {
  url: string;
  timeout?: number;
  trace?: ITrace;
  serializer?: ISerializer;
  deserializer?: IDeserializer;
}
