import { NestFactory } from '@nestjs/core';
import { RMQServerStrategy } from '@skeleton/transport';
import { SERVICE_TAG } from '@shared/hybrid-app';
import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    strategy: new RMQServerStrategy({
      url: 'amqp://localhost',
      tag: SERVICE_TAG
    })
  });
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
