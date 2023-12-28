import { Configuration, App, Config, ALL, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { ValidateService } from '@midwayjs/validate';
import { ConfigModel } from './model/config';

@Configuration({
  imports: [
    koa,
    validate,
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
}
