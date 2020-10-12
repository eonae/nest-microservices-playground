import { Module } from '@nestjs/common';
import { EventsController, TasksController } from './controllers';
import { DriversService, YandexIntegrationService } from './services';

@Module({
  imports: [],
  controllers: [TasksController, EventsController],
  providers: [YandexIntegrationService, DriversService]
})
export class AppModule { }
