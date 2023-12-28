import { Provide } from '@midwayjs/core';
import { SmsInterface } from './sms.interface';

@Provide('AliSMSService')
export class AliSMSService implements SmsInterface {
  async sendSms(phone: string): Promise<void> {
    console.log('ali: send sms to ' + phone);
  }
}
