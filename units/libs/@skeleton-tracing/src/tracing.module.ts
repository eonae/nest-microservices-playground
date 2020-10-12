import { DynamicModule, FactoryProvider, Module, Provider } from '@nestjs/common';
import { TRACE } from './constants';
import { ContinuationLocalStorage } from './services';
import { Trace } from './services';

@Module({})
export class TracingModule {
  public static forRoot (): DynamicModule {
    const clsProvider: Provider = {
      provide: ContinuationLocalStorage,
      useValue: ContinuationLocalStorage.create()
    };

    const traceProvider: FactoryProvider = {
      provide: TRACE,
      inject: [ContinuationLocalStorage],
      useFactory: (cls: ContinuationLocalStorage) => new Trace(cls)
    };

    return {
      module: TracingModule,
      providers: [traceProvider, clsProvider],
      exports: [traceProvider, clsProvider],
      global: true
    }
  }
}