import { v4 } from 'uuid';
import { ITrace } from './trace.interface';

export class DefaultTrace implements ITrace {
  getId = () => v4();
}
