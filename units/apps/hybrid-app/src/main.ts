import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RMQServerStrategy } from '@skeleton/transport';
import { SERVICE_TAG } from '@shared/hybrid-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: new RMQServerStrategy({
      url: 'amqp://localhost',
      tag: SERVICE_TAG
    }),
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}
bootstrap();
