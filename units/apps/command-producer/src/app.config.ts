import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfiguration {
  public url = 'amqp://localhost';

  public timeout = 10000;
}
