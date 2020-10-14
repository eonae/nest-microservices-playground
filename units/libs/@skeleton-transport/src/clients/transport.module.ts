import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { ClientStrategy } from '../strategies';
import { ClientsFactory } from './clients.factory';
import { EventBusClient } from './event-bus.class';

export interface TransportModuleAsyncOptions {
  useFactory: (...args: any[]) => ClientStrategy,
  inject?: any[]
}

export const TRANSPORT = 'CLIENT_TRANSPORT';

// Well we could use decorators to inject specific clients
// We could use unique injection token to allow multiple transports per application\
// We could create forInstance/forFeature method.

@Module({})
export class TransportModule {
  public static async forRootAsync (options: TransportModuleAsyncOptions): Promise<DynamicModule> {
    const transportStrategyProvider: FactoryProvider = {
      provide: TRANSPORT,
      inject: options.inject || [],
      useFactory: options.useFactory
    };

    return {
      module: TransportModule,
      providers: [transportStrategyProvider, EventBusClient, ClientsFactory],
      exports: [transportStrategyProvider, EventBusClient, ClientsFactory],
      global: true
    };
  }
}
