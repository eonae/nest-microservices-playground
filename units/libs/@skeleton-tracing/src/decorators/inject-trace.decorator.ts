import { CustomParameterDecorator } from '@libs/common';
import { Inject } from '@nestjs/common';
import { TRACE } from '../constants';

// tslint:disable-next-line: variable-name
export const InjectTrace = (): CustomParameterDecorator => Inject(TRACE);
