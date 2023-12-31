import {
  Autoload,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/core';
import { FuncFactory } from '../factory/func.factory';

@Provide()
@Autoload()
@Scope(ScopeEnum.Singleton)
export class OrderService {
  @Inject()
  funcFactory: FuncFactory;

  @Init()
  async init() {
    console.log('OrderService init');
    this.funcFactory.registerFunction(
      'getOldAddressByOrderNo',
      async (args, content, blocks) => {
        return await this.getOldAddressByOrderNo(args.params[0]);
      }
    );
  }

  async getOldAddressByOrderNo(orderNo: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return orderNo + ' 123oooooold_address';
  }
}
