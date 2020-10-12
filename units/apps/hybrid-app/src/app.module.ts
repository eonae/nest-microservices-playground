import { Module } from '@nestjs/common';
import { EventsController, HttpController, RpcController } from './controllers';
import { DriversService, YandexIntegrationService } from './services';
import { TracingModule } from '@skeleton/tracing';
import { LoggerModule } from '@skeleton/logger';
import { ConfigurationModule } from '@skeleton/configuration';
import { join } from 'path';

@Module({
  imports: [
    TracingModule.forRoot(),
    LoggerModule.forRoot(),
    ConfigurationModule.forRoot({
      envFilePath: join(__dirname, '../.env')
    })
  ],
  controllers: [HttpController, EventsController, RpcController],
  providers: [YandexIntegrationService, DriversService]
})
export class AppModule { }
