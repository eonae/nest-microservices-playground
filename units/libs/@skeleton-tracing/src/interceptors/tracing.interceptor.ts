import {
  CallHandler, ExecutionContext, Injectable, NestInterceptor
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';
import { ContinuationLocalStorage } from '../services';

export interface TracingMetadata {
  traceId: string;
  userId: string;
}

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  constructor (
    private cls: ContinuationLocalStorage
  ) { }

  public intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('type:', context.getType());
    const type = context.getType();
    const args = context.getArgs();
    const metadata = type === 'http'
      ? this.parseHttpContext(args[0])
      : this.parseRpcContext(args[0]);
    this.cls.createContext().metadata = metadata;
    return next.handle();
  }

  private parseRpcContext (rpcArgs: any): TracingMetadata {
    const traceId = rpcArgs.properties['x-trace-id'];
    const userId = rpcArgs.properties['x-user-id'];
    return {
      traceId,
      userId
    };
  }

  private parseHttpContext (incomingMessage: IncomingMessage): TracingMetadata {
    const traceId = incomingMessage.headers['x-trace-id'] as string;
    const userId = incomingMessage.headers['x-user-id'] as string;
    return {
      traceId,
      userId
    };
  }
}
