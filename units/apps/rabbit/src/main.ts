import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQServer } from '@transport/rabbitmq';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new RabbitMQServer({
      url: 'amqp://localhost',
      connectTo: { exchange: 'test_exchange' }
    }),
  });

  app.listen(() => console.log('listening...'));
}
bootstrap();
