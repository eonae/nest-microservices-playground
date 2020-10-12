"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQServer = void 0;
const amqplib_1 = require("amqplib");
const microservices_1 = require("@nestjs/microservices");
const uuid_1 = require("uuid");
class RabbitMQServer extends microservices_1.Server {
    constructor(options) {
        super();
        this.options = options;
    }
    get isInitialized() {
        return !!this.server;
    }
    async listen(callback) {
        const queue = await this.initQueue();
        this.channel.consume(queue, async (msg) => {
            const pattern = msg.fields.routingKey;
            console.log('pattern:', pattern);
            const handler = this.getHandlers().get(pattern);
            if (!handler) {
                console.log('handler not found!');
                this.channel.ack(msg);
                return;
            }
            console.log('Handler found!');
            const result = await (await handler(msg)).toPromise();
            console.log('result', result);
            const buf = Buffer.from(JSON.stringify(result));
            const { replyTo, messageId } = msg.properties;
            console.log('debug:', { result, replyTo, messageId });
            if (result && replyTo && messageId) {
                console.log('sending result to callback queue:', replyTo);
                const ok = this.channel.sendToQueue(replyTo, buf, { messageId });
                console.log(ok);
            }
            this.channel.ack(msg);
        }, {
            noAck: false,
        });
        callback();
    }
    async initQueue() {
        this.server = await amqplib_1.connect(this.options.url);
        this.channel = await this.server.createChannel();
        const connectTo = this.options.connectTo;
        if ('queue' in connectTo) {
            await this.channel.assertQueue(connectTo.queue, {});
            return connectTo.queue;
        }
        else {
            const exclusiveQueue = 'ex_' + uuid_1.v4();
            await this.channel.assertExchange(connectTo.exchange, 'fanout', {});
            await this.channel.assertQueue(exclusiveQueue, {
                exclusive: true
            });
            await this.channel.bindQueue(exclusiveQueue, connectTo.exchange, '');
            return exclusiveQueue;
        }
    }
    async close() {
        if (this.channel)
            await this.channel.close();
        if (this.server)
            await this.server.close();
    }
}
exports.RabbitMQServer = RabbitMQServer;
//# sourceMappingURL=rabbitmq-strategy.js.map