import { CreateDriverInput, CreateDriverOutput, CREATE_DRIVER_PATTERN } from '@shared/hybrid-app';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectLogger, ILogger } from '@skeleton/logger';
import { TracingInterceptor } from '@skeleton/tracing';
import { DriversService } from '../services';

@Controller()
@UseInterceptors(TracingInterceptor)
export class RpcController {
  constructor (
    private readonly drivers: DriversService,
    @InjectLogger(RpcController) private logger: ILogger
  ) { }

  @MessagePattern(CREATE_DRIVER_PATTERN)
  public async createDriver (input: CreateDriverInput): Promise<CreateDriverOutput> {
    this.logger.info('Processing command...');
    return this.drivers.create(input);
  }
}
