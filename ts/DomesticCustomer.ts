import { Customer } from "./Customer";
import { domestic } from "./modal";
type domestic = {
  id: number;
  name: string;
  price: number;
  amount: number;
  customers: string;
  quota: number;
};
export class DomesticCustomer extends Customer {
  private _customers: string;
  private _quota: number;

  constructor(customers: domestic) {
    super(customers.id, customers.name, customers.price, customers.amount);
    this._customers = customers.customers;
    this._quota = customers.quota;
  }

  public get customers(): string {
    return this._customers;
  }

  public get quota(): number {
    return this._quota;
  }

  cash(): number {
    return this._quota <= this.amount
      ? this.amount * this.price
      : this.amount * this.price * this._quota +
          (this.amount - this.quota) * this.price * 2.5;
  }
}
