export interface ClientStrategy {
  connect (): Promise<void>;
  close (): Promise<void>;
  send <TCommand, TResult>(tag: string, pattern: string, message: TCommand): Promise<TResult>;
  publish<TMessage> (pattern: string, message: TMessage): Promise<void>;
}
