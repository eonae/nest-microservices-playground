import { Injectable } from '@nestjs/common';
import { CreateDriverInput, CreateDriverOutput } from '@shared/hybrid-app';
import { InjectLogger, ILogger, ITrace } from '@skeleton/logger';
import { InjectTrace } from '@skeleton/tracing';

@Injectable()
export class DriversService {
  constructor (
    @InjectLogger(DriversService) private logger: ILogger,
    @InjectTrace() private trace: ITrace
  ) { }

  public async create (payload: CreateDriverInput): Promise<CreateDriverOutput> {
    console.log(this.trace.getId());
    this.logger.info('Creating driver...');
    return { success: true };
  }
}
