import {
  Configuration,
  App,
  Config,
  ALL,
  Inject,
  ILogger,
  MidwayDecoratorService,
  JoinPoint,
  REQUEST_OBJ_CTX_KEY,
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
import { LOGRECORD_KEY } from './decorator/log_record.decorator';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as _ from 'lodash';
import { Context } from '@midwayjs/koa';
import { LogRecordOptions } from './interface';
import * as Sqrl from 'squirrelly';
import { FuncFactory } from './factory/func.factory';

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
  decoratorService: MidwayDecoratorService;

  @Inject()
  logger: ILogger;

  @Inject()
  ctx: Context;

  @Inject()
  funcFactory: FuncFactory;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, AuthMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    // 校验失败后项目不会启动成功
    this.validateService.validate(ConfigModel, this.allConfig, {
      validationOptions: {
        allowUnknown: true, // 要允许未定义的属性，因为有些不是自己定义的,是框架启动后加上的
      },
    });

    // Sqrl.helpers.define(
    //   'getOldAddressByOrderNo',
    //   async (args, content, blocks) => {
    //     return await this.orderService.getOldAddressByOrderNo(args.params[0]);
    //   }
    // );

    // 实现方法装饰器
    this.decoratorService.registerMethodHandler(LOGRECORD_KEY, options => {
      return {
        around: async (joinPoint: JoinPoint) => {
          const instance = joinPoint.target;
          const ctx = instance[REQUEST_OBJ_CTX_KEY];
          const logOptions = options.metadata as LogRecordOptions;
          // const successCompiled = _.template(logOptions.successTemplate, {
          //   imports: {
          //     getOldAddressByOrderNo,
          //   },
          // });
          console.log('functionNames: ', this.funcFactory.functionNames());
          const orderNoCompiled = _.template(logOptions.bizNo);

          const result = await joinPoint.proceed(...joinPoint.args);
          setImmediate(async () => {
            const success = await Sqrl.render(
              logOptions.successTemplate,
              { ctx },
              // { async: true, asyncHelpers: ['getOldAddressByOrderNo'] }
              { async: true, asyncHelpers: this.funcFactory.functionNames() }
            );
            // 在这里可以把日志记录到mysql
            try {
              this.logger.info(
                orderNoCompiled({ ctx }),
                success
                // successCompiled({ oldAddress: 'oldAddress', ctx })
              );
            } catch (err) {
              this.logger.error(err);
            }
          });

          return result;
        },
      };
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
