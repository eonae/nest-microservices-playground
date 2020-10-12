import { Stopwatch, delay } from '@libs/common';
import { RMQClientStrategy, ServiceClient } from '@skeleton/transport';
import { CoreCommand, CreateDriverCommand } from '@shared/hybrid-app';

async function bootstrap() {
  const core = new ServiceClient<CoreCommand>(new RMQClientStrategy({
    url: 'amqp://localhost',
    timeout: 10000
  }));
  await core.init();
  while (true) {
    try {
      const sw = new Stopwatch();
      sw.start();
      const command = new CreateDriverCommand({
        name: 'Sergey',
        surname: 'Aslanov',
        license: 'XM123',
        phone: '+79645792790'
      });
      const result = await core.call(command);
      console.log('millis:' , sw.elapsedMilliseconds);
      console.log(result);
      sw.reset();
      await delay(5000);
    } catch (error) {
      console.log(error);
    }
  }
}

bootstrap();
