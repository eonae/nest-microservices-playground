import { Injectable } from '@nestjs/common';
import { InspectionEventPayload } from '@shared/hybrid-app';

@Injectable()
export class YandexIntegrationService {
  public async sendInspection (inspection: InspectionEventPayload) {
    if (Math.random() > 0.5) console.log('This inspection is suitable for yandex. Sending...');
    else console.log('Inspection has nothing to deal with yandex.');
  }
}