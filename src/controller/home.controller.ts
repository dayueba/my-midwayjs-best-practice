import { Controller, Get, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<any> {
    console.log(this.ctx.traceId);
    return {
      traceId: this.ctx.traceId,
    };
  }
}
