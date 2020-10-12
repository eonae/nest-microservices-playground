import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    console.log('context:', ctx.getContext());
    console.log('get data:', ctx.getData());
    // console.log(ctx.getArgs()[0]);
    return next.handle();
  }
}
