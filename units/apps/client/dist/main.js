"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@libs/common");
const rabbitmq_1 = require("@transport/rabbitmq");
async function bootstrap() {
    const client = new rabbitmq_1.RMQClient({
        url: 'amqp://localhost',
        exchange: 'test_exchange',
        timeout: 5000
    });
    await client.connect();
    while (true) {
        try {
            const sw = new common_1.Stopwatch();
            sw.start();
            const result = await client.send('Some useful payload');
            console.log('millis:', sw.elapsedMilliseconds);
            console.log(result);
            sw.reset();
            await common_1.delay(1000);
        }
        catch (error) {
            console.log(error);
        }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map