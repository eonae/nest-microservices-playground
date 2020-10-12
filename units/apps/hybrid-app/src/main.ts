import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RMQServerStrategy } from '@skeleton/transport';
import { SERVICE_TAG } from '@shared/hybrid-app';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new RMQServerStrategy({
      url: 'amqp://localhost',
      tag: SERVICE_TAG
    }),
  });

  app.listen(() => console.log('listening...'));
}
bootstrap();
