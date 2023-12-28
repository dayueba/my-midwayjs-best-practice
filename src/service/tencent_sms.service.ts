import { Provide } from '@midwayjs/core';
import { SmsInterface } from './sms.interface';

@Provide('TencentSMSService')
export class TencentSMSService implements SmsInterface {
  async sendSms(): Promise<void> {
    console.log('tencent: send sms');
  }
}
