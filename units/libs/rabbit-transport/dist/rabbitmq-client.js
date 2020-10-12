"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RMQClient = void 0;
const amqplib_1 = require("amqplib");
const events_1 = require("events");
const uuid_1 = require("uuid");
const support_1 = require("./support");
class RMQClient {
    constructor(options) {
        this.options = options;
        this.serializer = options.serializer || new support_1.DefaultSerializer();
        this.deserializer = options.deserializer || new support_1.DefaultDeserializer();
        this.trace = options.trace || new support_1.DefaultTrace();
        this.responseEmitter = new events_1.EventEmitter();
        this.callbackQueue = 'cb_' + uuid_1.v4();
    }
    get isInitialized() {
        return !!this.connection;
    }
    async connect() {
        const exchangeOptions = {};
        const callbackQueueOptions = { exclusive: true };
        this.connection = await amqplib_1.connect(this.options.url);
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(this.options.exchange, 'fanout', exchangeOptions);
        await this.channel.assertQueue(this.callbackQueue, callbackQueueOptions);
        console.log(this.callbackQueue);
        await this.channel.consume(this.callbackQueue, msg => {
            console.log('callback');
            const messageId = msg.properties.messageId;
            this.responseEmitter.emit(messageId, msg.content);
            this.channel.ack(msg);
        }, { noAck: false });
    }
    async close() {
        if (this.channel)
            await this.channel.close();
        if (this.connection)
            await this.connection.close();
    }
    send(message) {
        const messageId = uuid_1.v4();
        const correlationId = this.trace.getId();
        console.log({ messageId, correlationId });
        return new Promise((resolve, reject) => {
            this.responseEmitter.once(messageId, response => resolve(this.deserializer.deserialize(response)));
            setTimeout(() => reject(new Error('timeout')), this.options.timeout);
            const payload = this.serializer.serialize(message);
            const pub = this.channel.publish(this.options.exchange, 'test', payload, {
                messageId,
                correlationId,
                replyTo: this.callbackQueue,
            });
            console.log(pub);
        });
    }
    async publish(message) {
        const payload = this.serializer.serialize(message);
        this.channel.publish(this.options.exchange, '', payload);
    }
}
exports.RMQClient = RMQClient;
//# sourceMappingURL=rabbitmq-client.js.map