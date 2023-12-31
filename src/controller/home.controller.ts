import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LogRecord } from '../decorator/log_record.decorator';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<any> {
    return {
      traceId: this.ctx.traceId,
    };
  }

  @Get('/test_log')
  @LogRecord({
    successTemplate:
      '修改了订单的配送地址：从“{{ @async getOldAddressByOrderNo(it.ctx.query.orderNo) /}}”, 修改到“{{it.ctx.query.address}}”',
    bizNo: '${ctx.query.orderNo}',
  })
  async updateAddress(@Query() query): Promise<any> {
    return query;
  }
}
