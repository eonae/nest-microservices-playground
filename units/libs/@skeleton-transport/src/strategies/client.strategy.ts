export interface ClientStrategy {
  connect (): Promise<void>;
  close (): Promise<void>;
  send (tag: string, pattern: string, message: any): Promise<any>;
  publish (pattern: string, message: any): Promise<void>;
}
