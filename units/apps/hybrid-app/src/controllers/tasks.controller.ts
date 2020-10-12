import { CreateDriverInput, CreateDriverOutput, CREATE_DRIVER_PATTERN } from '@shared/hybrid-app';
import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppInterceptor } from '../app.interceptor';
import { DriversService } from '../services';

@Controller()
@UseInterceptors(AppInterceptor)
export class TasksController {
  constructor (
    private readonly drivers: DriversService
  ) { }

  @MessagePattern(CREATE_DRIVER_PATTERN)
  public async createDriver(input: CreateDriverInput): Promise<CreateDriverOutput> {
    return this.drivers.create(input);
  }
}
