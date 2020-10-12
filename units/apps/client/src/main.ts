import { Stopwatch, delay } from '@libs/common';
import { RMQClient } from '@transport/rabbitmq';

async function bootstrap() {
  const client = new RMQClient<string, string>({
    url: 'amqp://localhost',
    exchange: 'test_exchange',
    timeout: 5000
  });

  await client.connect();
  while (true) {
    try {
      const sw = new Stopwatch();
      sw.start();
      const result = await client.send('Some useful payload');
      console.log('millis:' , sw.elapsedMilliseconds);
      console.log(result);
      sw.reset();
      await delay(1000);
    } catch (error) {
      console.log(error);
    }
  }
}
bootstrap();
