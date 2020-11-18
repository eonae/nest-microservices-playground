import { Module } from '@nestjs/common';
import { RMQClientStrategy, TransportModule } from '@skeleton/transport';
import { Trace, TracingModule } from '@skeleton/tracing';

@Module({
  imports: [
    TransportModule.forRootAsync({
      inject: ['TRACE'],
      useFactory: (trace: Trace) => new RMQClientStrategy({
        /**
         * We can inject some configuration service (and import corresponding module
         * if needed)
         */
        url: 'amqp://localhost',
        timeout: 10000,
        trace
      })
    }),
    TracingModule.forRoot()
  ]
})
export class AppModule { }
