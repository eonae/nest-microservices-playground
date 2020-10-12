import { CreateDriverInput, CreateDriverOutput } from '@shared/hybrid-app';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { InjectLogger, ILogger } from '@skeleton/logger';
import { TracingInterceptor } from '@skeleton/tracing';
import { DriversService } from '../services';

@Controller()
@UseInterceptors(TracingInterceptor)
export class HttpController {
  constructor (
    private readonly drivers: DriversService,
    @InjectLogger(HttpController) private logger: ILogger
  ) { }

  @Get('/')
  public async createDriver(input: CreateDriverInput): Promise<CreateDriverOutput> {
    this.logger.info('Processing http request...');
    return this.drivers.create(input);
  }
}
