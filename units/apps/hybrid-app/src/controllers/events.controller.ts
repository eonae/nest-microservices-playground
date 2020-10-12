import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InspectionEventPayload } from '@shared/hybrid-app';
import { AppInterceptor } from '../app.interceptor';
import { YandexIntegrationService } from '../services';

@Controller()
@UseInterceptors(AppInterceptor)
export class EventsController {
  constructor (
    private readonly service: YandexIntegrationService
  ) { }

  @EventPattern('inspection')
  public async handleInspectionEvent(payload: InspectionEventPayload): Promise<void> {
    await this.service.sendInspection(payload);
  }
}
