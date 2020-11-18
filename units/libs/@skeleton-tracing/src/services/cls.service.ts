import { Injectable } from '@nestjs/common';
import { createHook, executionAsyncId } from 'async_hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Context = Record<string, any>;

@Injectable()
export class ContinuationLocalStorage {
  private contexts: Map<number, Context>;

  private constructor () {
    this.contexts = new Map<number, Context>();
  }

  public static create (): ContinuationLocalStorage {
    const cls = new ContinuationLocalStorage();
    cls.init();
    return cls;
  }

  private init () {
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

  public createContext (): Context {
    const context: Context = {};
    this.contexts.set(executionAsyncId(), context);
    return context;
  }

  public getContext (): Context {
    return this.contexts.get(executionAsyncId());
  }
}
