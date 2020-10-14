export interface ISerializer {
  serialize<T> (payload: T): Buffer;
}
