import { Rule, RuleType } from '@midwayjs/validate';

export class CreateUserReq {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  phone: string;
}
