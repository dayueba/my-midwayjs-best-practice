import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      ctx.user = {
        user_id: 'user_id',
        user_name: 'user_name',
      };
      await next();
    };
  }

  static getName(): string {
    return 'report';
  }
}
