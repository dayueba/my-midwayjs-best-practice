import { Currency, Money } from '../vo/money';
import { ExchangeRate } from '../vo/exchange_rate';

export class PayService {
  BankService: any;
  ExchangeService: any;

  // old
  // 只适用境内转账
  // async pay(money: number, recipientId: number) {
  //   await this.BankService.transfer(money, 'CNY', recipientId);
  // }

  // async pay(money: Money, recipientId: number) {
  //   await this.BankService.transfer(money, recipientId);
  // }

  // 转给不同的货币，汇率会变
  // async pay(money: Money, targetCurrency: Currency, recipientId: number) {
  //   if (money.currency === targetCurrency) {
  //     await this.BankService.transfer(money, recipientId);
  //   } else {
  //     const rate = await this.BankService.getExchangeRate(
  //       money.currency,
  //       targetCurrency
  //     );
  //     const amount = money.amount * rate;
  //     await this.BankService.transfer(
  //       new Money(amount, targetCurrency),
  //       recipientId
  //     );
  //   }
  // }

  async pay(money: Money, targetCurrency: Currency, recipientId: number) {
    const rate: ExchangeRate = this.ExchangeService.getRate(
      money.currency,
      targetCurrency
    );
    const targetMoney = rate.exchange(money);
    await this.BankService.transfer(targetMoney, recipientId);
  }
}
