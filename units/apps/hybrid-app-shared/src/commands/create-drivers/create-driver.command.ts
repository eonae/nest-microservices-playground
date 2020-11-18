import { CoreCommand } from '../../core-command.base';
import { CreateDriverInput } from './create-driver.input';

export const CREATE_DRIVER_PATTERN = 'create_driver';

export class CreateDriverCommand extends CoreCommand<CreateDriverInput> {
  constructor (input: CreateDriverInput) {
    super('create_driver', input);
  }
}
