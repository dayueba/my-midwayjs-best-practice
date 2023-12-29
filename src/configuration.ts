import {
  Configuration,
  App,
  Config,
  ALL,
  Inject,
  ILogger,
} from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { ValidateService } from '@midwayjs/validate';
import { ConfigModel } from './model/config';
import { AsyncJobService } from './service/async_job.service';
import * as otel from '@midwayjs/otel';

@Configuration({
  imports: [
    koa,
    validate,
    otel,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  @Config(ALL)
  allConfig;

  @Inject()
  validateService: ValidateService;

  @Inject()
  jobService: AsyncJobService;

  @Inject()
  logger: ILogger;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    // 校验失败后项目不会启动成功
    this.validateService.validate(ConfigModel, this.allConfig, {
      validationOptions: {
        allowUnknown: true, // 要允许未定义的属性，因为有些不是自己定义的,是框架启动后加上的
      },
    });
  }

  async onStop() {
    this.logger.info('on stop');
    // 在这里可以做一些收尾工作
    // 检测所有异步任务做完再退出
    this.jobService.stop();

    while (!this.jobService.done()) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    this.logger.info('on stop done');

    // todo 后续想优化的话，可以遍历所有的service 如果有stop方法的话，则并发执行
  }
}
