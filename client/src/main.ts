import { Stopwatch, delay } from '@libs/common';
import { RMQClient } from './rabbitmq-client';

async function bootstrap() {
  const client = new RMQClient<string, string>({
    url: 'amqp://localhost',
    exchange: 'test_exchange',
    timeout: 5000
  });
  try {
    await client.connect();
    while (true) {
      const sw = new Stopwatch();
      sw.start();
      const result = await client.send('Some useful payload');
      console.log('millis:' , sw.elapsedMilliseconds);
      console.log(result);
      sw.reset();
      delay(1000);
    }
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
