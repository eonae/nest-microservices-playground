import { Injectable } from '@nestjs/common';
import { ContinuationLocalStorage } from './cls.service';

@Injectable()
export class Trace {
  constructor (
    private cls: ContinuationLocalStorage
  ) { }

  public getId (): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.cls.getContext()?.metadata?.traceId as string;
  }
}
