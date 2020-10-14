import { DomainEvent } from '@skeleton/transport';
import { InspectionEventPayload } from './inspection-event.payload';

export class InspectionEvent implements DomainEvent {
  public readonly pattern = 'inspection';

  constructor (
    public readonly payload: InspectionEventPayload
  ) { }
}
