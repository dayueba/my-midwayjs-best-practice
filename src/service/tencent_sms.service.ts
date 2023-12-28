import { Provide } from '@midwayjs/core';
import { SmsInterface } from './sms.interface';

@Provide('TencentSMSService')
export class TencentSMSService implements SmsInterface {
  async sendSms(phone: string): Promise<void> {
    console.log('tencent: send sms to ' + phone);
  }
}
