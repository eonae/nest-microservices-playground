/* eslint-disable max-classes-per-file */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Command<TPayload = any> {
  service: string;
  pattern: string;
  payload: TPayload;
}

// export abstract class CoreCommand<TPayload> implements Command<TPayload> {
//   public readonly service = 'core';

//   constructor (
//     public readonly pattern: string,
//     public readonly payload: TPayload
//   ) { }
// }

// export interface GetEmployeesQueryPayload {
//   some: string;
// }
// export class GetEmployeesQuery extends CoreCommand<GetEmployeesQueryPayload> {
//   constructor (payload: GetEmployeesQueryPayload) {
//     super('get_employees', payload);
//   }
// }
