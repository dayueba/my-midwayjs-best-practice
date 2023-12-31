import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import * as Sqrl from 'squirrelly';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class FuncFactory {
  map: Map<string, any> = new Map();

  registerFunction(name: string, func: any) {
    console.log('register function, name: ', name);
    this.map.set(name, func);
    Sqrl.helpers.define(name, func);
  }

  functionNames(): string[] {
    return Array.from(this.map.keys());
  }
}
