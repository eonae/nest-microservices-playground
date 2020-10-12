import { Injectable } from '@nestjs/common';
import { InspectionEventPayload } from '@shared/hybrid-app';
import { InjectLogger, ILogger } from '@skeleton/logger';

@Injectable()
export class YandexIntegrationService {
  constructor (
    @InjectLogger(YandexIntegrationService) private logger: ILogger
  ) { }

  public async sendInspection (inspection: InspectionEventPayload) {
    if (Math.random() > 0.5) this.logger.info('This inspection is suitable for yandex. Sending...');
    else this.logger.info('Inspection has nothing to deal with yandex.');
  }
}