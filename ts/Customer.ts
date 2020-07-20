export abstract class Customer {
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

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get amount(): number {
    return this._amount;
  }

  abstract cash(): number;
}
