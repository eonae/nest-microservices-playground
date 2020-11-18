/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, FactoryProvider, ForwardReference, Module, Type } from '@nestjs/common';
import { InjectorDependency } from '@nestjs/core/injector/injector';
import { ClientStrategy } from '../strategies';
import { ClientsFactory } from './clients.factory';
import { TRANSPORT } from './constants';
import { EventBusClient } from './event-bus.class';

export interface TransportModuleAsyncOptions {
  useFactory: (...args: any[]) => ClientStrategy,
  inject?: InjectorDependency[],
  imports?: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>)[]
}

// Well we could use decorators to inject specific clients
// We could use unique injection token to allow multiple transports per application\
// We could create forInstance/forFeature method.

@Module({})
export class TransportModule {
  public static forRootAsync (options: TransportModuleAsyncOptions): DynamicModule {
    const strategyProvider: FactoryProvider = {
      provide: TRANSPORT,
      inject: options.inject || [],
      useFactory: options.useFactory
    };

    return {
      module: TransportModule,
      imports: options.imports,
      providers: [strategyProvider, EventBusClient, ClientsFactory],
      exports: [EventBusClient, ClientsFactory],
      global: true
    };
  }
}
