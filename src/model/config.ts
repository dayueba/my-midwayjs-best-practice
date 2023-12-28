import { getSchema, Rule, RuleType } from '@midwayjs/validate';
export class KoaConfig {
  @Rule(RuleType.number().required())
  port: number;
}

export class ConfigModel {
  @Rule(RuleType.string().required())
  keys: string;
  @Rule(getSchema(KoaConfig).required())
  koa: KoaConfig;
}
