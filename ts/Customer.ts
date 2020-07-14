import { Electricity } from './Electricity';
export abstract class Customer implements Electricity{
  private _id: number;
  private _name: string;
  private _price: number;
  private _amount: number;
  constructor(id: number, name: string, price: number, amount: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._amount = amount;
  }

  public get id(): number {
    return this._id;
  }

  public set id(v: number) {
    this._id = v;
  }

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get price(): number {
    return this._price;
  }

  public set price(v: number) {
    this._price = v;
  }

  public get amount(): number {
    return this._amount;
  }

  public set amount(v: number) {
    this._amount = v;
  }

  abstract cash(): number;
}
