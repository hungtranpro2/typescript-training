import { Customer } from "./Customer";
export class ForeignCustomer extends Customer {
  private _nationality: string;

  constructor(
    id: number,
    name: string,
    price: number,
    amount: number,
    nationality: string
  ) {
    super(id, name, price, amount);
    this._nationality = nationality;
  }

  public get nationality(): string {
    return this._nationality;
  }

  public set nationality(v: string) {
    this._nationality = v;
  }

  cash(): number {
    return this.amount * this.price;
  }
}
