import { Server, CustomTransportStrategy } from '@nestjs/microservices';
declare type Callback<T = void> = () => T;
export declare type ConnectTo = {
    exchange: string;
} | {
    queue: string;
};
export interface RabbitMQServerOptions {
    url: string;
    connectTo: ConnectTo;
}
export declare class RabbitMQServer extends Server implements CustomTransportStrategy {
    private options;
    private server;
    private channel;
    get isInitialized(): boolean;
    constructor(options: RabbitMQServerOptions);
    listen(callback: Callback): Promise<void>;
    private initQueue;
    close(): Promise<void>;
}
export {};
