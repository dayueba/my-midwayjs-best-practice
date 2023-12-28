import { Init, Inject, Provide } from '@midwayjs/core';
import { SmsInterface } from './sms.interface';

@Provide()
export class AsyncJobService implements SmsInterface {
  @Inject('AliSMSService')
  smsService: SmsInterface;

  jobs: string[];
  stopFlog: boolean;
  doneFlag: boolean;

  @Init()
  async init() {
    this.jobs = [];
    this.stopFlog = false;
    this.doneFlag = false;

    while (!this.stopFlog) {
      if (!this.jobs.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      await this.sendSms();
    }

    this.doneFlag = true;
  }
  async addJob(phoneNumber: string) {
    if (this.stopFlog) {
      throw new Error('can not add job');
    }
    this.jobs.push(phoneNumber);
  }

  async sendSms(): Promise<void> {
    for (const phoneNumber of this.jobs) {
      await this.smsService.sendSms(phoneNumber);
    }
  }
  stop() {
    this.stopFlog = true;
  }

  done() {
    return this.doneFlag;
  }
}
