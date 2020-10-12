/// <reference types="node" />
export interface ITrace {
    getId(): string;
}
export declare class DefaultTrace implements ITrace {
    getId: () => any;
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
    serialize(payload: T): Buffer;
}
export interface IDeserializer<T> {
    deserialize(buf: Buffer): T;
}
export declare class DefaultSerializer<T> implements ISerializer<T> {
    serialize(payload: T): Buffer;
}
export declare class DefaultDeserializer<T> implements IDeserializer<T> {
    deserialize(buf: Buffer): T;
}
