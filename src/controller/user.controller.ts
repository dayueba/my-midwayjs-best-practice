import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { CreateUserReq } from '../dto/user';
import { Name } from '../vo/name';
import { PhoneNumber } from '../vo/phone';

@Controller('/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post()
  async createUser(@Body() req: CreateUserReq) {
    await this.userService.findByNameAndPhone(
      new Name(req.name),
      // undefined,
      new PhoneNumber(req.phone)
      // null
    );
  }
}
