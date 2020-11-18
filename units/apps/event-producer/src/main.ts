/* eslint-disable no-console */

import { delay } from '@libs/common';
import { RMQClientStrategy, EventBusClient } from '@skeleton/transport';
import { InspectionEvent } from '@shared/hybrid-app';

async function bootstrap () {
  const bus = new EventBusClient(new RMQClientStrategy({
    url: 'amqp://localhost'
  }));

  await bus.init();
  let counter = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const event = new InspectionEvent({
        id: counter++,
        driverName: 'Sergey',
        type: 'before',
        result: true
      });
      await bus.publish(event);
      await delay(5000);
    } catch (error) {
      console.log(error);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
