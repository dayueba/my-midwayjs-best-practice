import { createCustomMethodDecorator } from '@midwayjs/core';
import { LogRecordOptions } from '../interface';

export const LOGRECORD_KEY = 'decorator:logging_key';

export function LogRecord(req: LogRecordOptions): MethodDecorator {
  return createCustomMethodDecorator(LOGRECORD_KEY, req);
}
