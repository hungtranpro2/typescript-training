import { Customer } from "./Customer";
export class DomesticCustomer extends Customer {
  private _customers: string;
  private _quota: number;

  constructor(
    id: number,
    name: string,
    price: number,
    amount: number,
    customer: string,
    quota: number
  ) {
    super(id, name, price, amount);
    this._customers = customer;
    this._quota = quota;
  }

  public get customer(): string {
    return this._customers;
  }

  public set customer(v: string) {
    this._customers = v;
  }

  public get quota(): number {
    return this._quota;
  }

  public set quota(v: number) {
    this._quota = v;
  }

  cash(): number {
    if (this._quota <= this.amount) {
      return this.amount * this.price;
    } else {
      return (
        this.amount * this.price * this._quota +
        (this.amount - this.quota) * this.price * 2.5
      );
    }
  }
}
