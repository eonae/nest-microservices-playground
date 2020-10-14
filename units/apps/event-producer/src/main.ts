import { delay } from '@libs/common';
import { RMQClientStrategy, EventBusClient } from '@skeleton/transport';
import { InspectionEvent } from '@shared/hybrid-app';

async function bootstrap () {
  const bus = new EventBusClient(new RMQClientStrategy({
    url: 'amqp://localhost'
  }));

  await bus.init();
  let counter = 0;
  while (true) {
    try {
      const event = new InspectionEvent({
        id: counter++,
        driverName: 'Sergey',
        type: 'before',
        result: true
      });
      bus.publish(event);
      await delay(5000);
    } catch (error) {
      console.log(error);
    }
  }
}

bootstrap();
