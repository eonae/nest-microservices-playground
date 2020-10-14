import { Module } from '@nestjs/common';
import { RMQClientStrategy, TransportModule } from '@skeleton/transport';

import { TracingModule, Trace } from '@skeleton/tracing';
import { AppConfiguration } from './app.config';

@Module({
  imports: [
    TransportModule.forRootAsync({
      inject: [AppConfiguration, 'TRACE'],
      useFactory: (config: AppConfiguration, trace: Trace) => new RMQClientStrategy({
        url: config.url,
        timeout: 10000,
        trace
      })
    }),
    TracingModule.forRoot()
  ],
  providers: [AppConfiguration]
})
export class AppModule { }
