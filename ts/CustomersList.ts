import { Customer } from './Customer';
export class CustomersList {
  customersList: Customer[] =[];

  constructor() {}

  addCustomer(customer: Customer) {
    this.customersList.push(customer);
  }

  editCustomer(index: number, customer: Customer) {
    this.customersList[index] = customer;
  }
}
