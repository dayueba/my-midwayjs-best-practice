import { Init, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { SmsInterface } from './sms.interface';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
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
  }
  async addJob(phoneNumber: string) {
    if (this.stopFlog) {
      throw new Error('can not add job');
    }
    this.jobs.push(phoneNumber);
  }

  async sendSms(): Promise<void> {
    while (!this.stopFlog) {
      if (!this.jobs.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      for (const phoneNumber of this.jobs) {
        await this.smsService.sendSms(phoneNumber);
      }
    }

    this.doneFlag = true;
  }
  stop() {
    this.stopFlog = true;
  }

  done() {
    return this.doneFlag;
  }
}
