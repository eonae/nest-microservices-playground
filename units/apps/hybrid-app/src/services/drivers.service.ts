import { Injectable } from '@nestjs/common';
import { CreateDriverInput, CreateDriverOutput } from '@shared/hybrid-app';

@Injectable()
export class DriversService {
  public async create (payload: CreateDriverInput): Promise<CreateDriverOutput> {
    console.log('Creating driver...', payload);
    return { success: true }
  }
}
