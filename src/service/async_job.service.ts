import {
  Destroy,
  ILogger,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/core';
import { SmsInterface } from './sms.interface';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class AsyncJobService {
  @Inject('AliSMSService')
  smsService: SmsInterface;

  jobs: string[];
  stopFlog: boolean;
  doneFlag: boolean;

  @Inject()
  logger: ILogger;

  @Init()
  async init() {
    console.log('start init');
    this.jobs = [];
    this.stopFlog = false;
    this.doneFlag = false;

    this.runJob();
    console.log('end init');
  }
  async addJob(phoneNumber: string) {
    if (this.stopFlog) {
      throw new Error('can not add job');
    }
    this.jobs.push(phoneNumber);
  }

  async runJob(): Promise<void> {
    console.log('start run job');
    this.logger.info('start run job');
    while (!this.stopFlog) {
      if (!this.jobs.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        const phoneNumber = this.jobs.shift();
        await this.smsService.sendSms(phoneNumber);
      }
    }

    this.doneFlag = true;
  }
  stop() {
    this.logger.info('stop job');
    this.stopFlog = true;
  }

  done() {
    return this.doneFlag;
  }

  @Destroy()
  async destroy() {
    console.log('start destroy job', new Date());
    this.logger.info('start destroy');
    await new Promise(resolve => setTimeout(resolve, 10000));
    this.logger.info('destroy done');
    console.log('end destroy job', new Date());
  }
}
