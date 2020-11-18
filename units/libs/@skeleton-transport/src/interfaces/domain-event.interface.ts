export interface DomainEvent<TPayload> {
  pattern: string;
  payload: TPayload;
}
