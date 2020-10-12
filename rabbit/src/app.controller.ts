import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppInterceptor } from './app.interceptor';

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  @MessagePattern('test')
  getHello(data: any): string {
    console.log('Received data:', data);
    return 'Received!';
  }
}
