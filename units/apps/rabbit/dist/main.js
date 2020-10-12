"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const rabbitmq_1 = require("@transport/rabbitmq");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        strategy: new rabbitmq_1.RabbitMQServer({
            url: 'amqp://localhost',
            connectTo: { exchange: 'test_exchange' }
        }),
    });
    app.listen(() => console.log('listening...'));
}
bootstrap();
//# sourceMappingURL=main.js.map