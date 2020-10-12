import { Injectable } from '@nestjs/common';
import { ContinuationLocalStorage } from './cls.service';

@Injectable()
export class Trace {
  constructor (
    private cls: ContinuationLocalStorage
  ) { }

  public getId (): string {
    return this.cls.getContext()?.metadata?.traceId;
  }
}
