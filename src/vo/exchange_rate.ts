import { Currency, Money } from './money';
import { RuleType, Valid } from '@midwayjs/validate';

export class ExchangeRate {
  constructor(
    public readonly rate: number,
    public readonly from: Currency,
    public readonly to: Currency
  ) {}

  exchange(@Valid(RuleType.object().required()) formMoney: Money): Money {
    const amount = formMoney.amount * this.rate;
    return new Money(amount, this.to);
  }
}
