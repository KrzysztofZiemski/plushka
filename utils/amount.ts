import { Currency } from "../types/currency";

export class Amount {
  //in the smallest denomination
  private privateAmount: number;
  private currency: Currency;
  constructor(amount: number, currency: Currency) {
    this.privateAmount = amount;
    this.currency = currency;
  }

  add(value: number) {
    this.privateAmount += value;
  }
  subtract(value: number) {
    this.privateAmount -= value;
  }
  get amount() {
    return this.privateAmount;
  }

  get price() {
    const value = this.amount / 100;

    switch (this.currency) {
      case "PLN":
        return `${value} zł`;
      default:
        return `${value} zł`;
    }
  }
}
