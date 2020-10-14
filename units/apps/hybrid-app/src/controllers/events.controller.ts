import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InspectionEventPayload } from '@shared/hybrid-app';
import { InjectLogger, ILogger } from '@skeleton/logger';
import { TracingInterceptor } from '@skeleton/tracing';
import { YandexIntegrationService } from '../services';

@Controller()
@UseInterceptors(TracingInterceptor)
export class EventsController {
  constructor (
    private readonly service: YandexIntegrationService,
    @InjectLogger(EventsController) private logger: ILogger
  ) { }

  @EventPattern('inspection')
  public async handleInspectionEvent (payload: InspectionEventPayload): Promise<void> {
    this.logger.info('Handling event...');
    await this.service.sendInspection(payload);
  }
}
