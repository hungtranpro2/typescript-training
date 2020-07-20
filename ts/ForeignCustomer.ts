import { Customer } from "./Customer";
import { foreign } from "./modal";
type foreign = {
  id: number;
  name: string;
  price: number;
  amount: number;
  nationality: string;
};
export class ForeignCustomer extends Customer {
  private _nationality: string;

  constructor(customers: foreign) {
    super(customers.id, customers.name, customers.price, customers.amount);
    this._nationality = customers.nationality;
  }

  public get nationality(): string {
    return this._nationality;
  }

  cash(): number {
    return this.amount * this.price;
  }
}
