/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */

import { v4 } from 'uuid';
import { delay } from '@libs/common';
import { CoreCommand, CreateDriverCommand, CreateDriverOutput } from '@shared/hybrid-app';
import { NestFactory } from '@nestjs/core';
import { ClientsFactory } from '@skeleton/transport';
import { ContinuationLocalStorage } from '@skeleton/tracing';
import { AppModule } from './app.module';

async function bootstrap () {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cls = app.get(ContinuationLocalStorage);
  const factory = app.get(ClientsFactory);

  const client = await factory.create<CoreCommand>();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      cls.createContext().metadata = { traceId: v4() };
      const command = new CreateDriverCommand({
        name: 'Sergey',
        surname: 'Aslanov',
        license: 'XM123',
        phone: '+79645792790'
      });
      const result = await client.call<CreateDriverOutput>(command);
      console.log(result);
      await delay(5000);
    } catch (error) {
      console.log(error);
    }
  }
}

bootstrap();
