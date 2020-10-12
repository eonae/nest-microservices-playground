import { delay } from '@libs/common';
import { RMQClientStrategy, EventBusClient } from '@skeleton/transport';
import { InspectionEvent } from '@shared/hybrid-app';

async function bootstrap() {


  const bus = new EventBusClient(new RMQClientStrategy({
    url: 'amqp://localhost',
    timeout: 10000
  }));

  await bus.init();
  let counter = 0;
  while (true) {
    try {
      bus.publish(new InspectionEvent({
        id: counter++,
        driverName: 'Sergey',
        type: 'before',
        result: true
      }));
      await delay(1000);
    } catch (error) {
      console.log(error);
    }
  }
}

bootstrap();
