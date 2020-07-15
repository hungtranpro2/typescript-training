import { Customer } from "./Customer";
export class CustomersList {
  customersList: Array<Customer> = new Array<Customer>();

  constructor() {}

  addCustomer(customer: Customer) {
    this.customersList.push(customer);
  }

  editCustomer(index, customer: Customer) {
    this.customersList[index] = customer;
  }
}
