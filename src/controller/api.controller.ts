import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { SmsInterface } from '../service/sms.interface';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  // 注入不同的第三方短信服务，后面切换的时候注入别的service就好
  // todo 但是这里有个问题，这里没法校验 AliSMSService 是否实现了interface
  // 需要自己手动去查 AliSMSService 是否实现了接口
  // todo 后续可以加个校验
  @Inject('AliSMSService')
  smsService: SmsInterface; // 这里是接口

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/send_sms')
  async sendSms(@Body('phone') phone: string) {
    await this.smsService.sendSms(phone);
  }
}
