import { Injectable } from '@nestjs/common';
import { createHook, executionAsyncId } from 'async_hooks';

@Injectable()
export class ContinuationLocalStorage {
  private contexts: Map<number, any>;

  private constructor () {
    this.contexts = new Map<number, any>();
  }

  public static create (): ContinuationLocalStorage {
    const cls = new ContinuationLocalStorage();
    cls.init();
    return cls;
  }

  private init () {
    console.log('Initializing hooks...');
    createHook({
      init: (asyncId: number, type: string, parentId: number) => {
        if (this.contexts.has(parentId)) {
          this.contexts.set(asyncId, this.contexts.get(parentId));
        }
      },
      destroy: (asyncId: number) => {
        this.contexts.delete(asyncId);
      }
    }).enable();
  }

  public createContext (): any {
    const context: any = {};
    this.contexts.set(executionAsyncId(), context);
    return context;
  }

  public getContext (): any {
    return this.contexts.get(executionAsyncId());
  }
}
