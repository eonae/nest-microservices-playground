import { RMQClientOptions } from './support';
export declare class RMQClient<TIn, TOut> {
    private options;
    private connection;
    private channel;
    private responseEmitter;
    private serializer;
    private deserializer;
    private callbackQueue;
    private trace;
    get isInitialized(): boolean;
    constructor(options: RMQClientOptions<TIn, TOut>);
    connect(): Promise<void>;
    close(): Promise<void>;
    send(message: TIn): Promise<TOut>;
    publish(message: TIn): Promise<void>;
}
