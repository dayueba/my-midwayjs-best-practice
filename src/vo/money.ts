export class Currency {}

export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: Currency
  ) {}
}
