// Import file
import { CustomersList } from "./CustomersList";
import {
  checkInputs,
  id,
  user,
  price,
  amount,
  customers,
  quota,
  nationality,
  customerType,
} from "./validate";
import { DomesticCustomer } from "./DomesticCustomer";
import { snackBar } from "./snackbar";
import { ForeignCustomer } from "./ForeignCustomer";
import { DisplayList, SetupPagination, current_page, rows } from "./pagination";
import { domestic, foreign } from "./modal";

// Variable
export let list = new CustomersList();
export let tBody = document.getElementById("tBodyBills");
export const btnAdd = document.getElementById("btn-submit");
export const btnUpdate = document.getElementById("btn-update");
const form = <HTMLFormElement>document.getElementById("form");
const pagination_element = document.getElementById("pagination");

let idValue: number;
let userValue: string;
let priceValue: number;
let amountValue: number;
let customersValue: string;
let quotaValue: number;
let nationalityValue: string;

// Show Modal
export function showAddButton(): void {
  if (list.customersList.length == 0) {
    id.value = "1";
  } else {
    id.value = (
      list.customersList[list.customersList.length - 1].id + 1
    ).toString();
  }
  btnAdd.style.display = "block";
  btnUpdate.style.display = "none";
}

// Add Customer
export function addCustomer(): void {
  if (list.customersList.length == 0) {
    idValue = 1;
  } else {
    idValue = list.customersList[list.customersList.length - 1].id + 1;
  }
  userValue = user.value.trim();
  priceValue = parseInt(price.value.trim());
  amountValue = parseInt(amount.value.trim());
  customersValue = customers.value.trim();
  quotaValue = parseInt(quota.value.trim());
  nationalityValue = nationality.value.trim();
  if (customerType.selectedIndex == 0 && checkInputs()) {
    let domesticCustomer = new DomesticCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      customersValue,
      quotaValue
    );
    list.addCustomer(domesticCustomer);
    snackBar("Add Success");
    form.reset();
    id.value = (
      list.customersList[list.customersList.length - 1].id + 1
    ).toString();
    customerType.selectedIndex = 0;
  }
  if (customerType.selectedIndex == 1 && checkInputs()) {
    let foreignCustomer = new ForeignCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      nationalityValue
    );
    list.addCustomer(foreignCustomer);
    snackBar("Add Success");
    form.reset();
    id.value = (
      list.customersList[list.customersList.length - 1].id + 1
    ).toString();
    customerType.selectedIndex = 1;
  }

  DisplayList(list.customersList, tBody, rows, current_page);
  SetupPagination(list.customersList, pagination_element, rows);
}

// Delete Customer
export const deleteCustomer = (event): void => {
  const customerIndex = event.target.dataset.id;
  if (confirm("Are you sure?")) {
    list.customersList.splice(customerIndex - 1, 1);
    snackBar("Delete Success");
    DisplayList(list.customersList, tBody, rows, current_page);
    SetupPagination(list.customersList, pagination_element, rows);
  }
};

// Set value
let data: number;
export const setValue = (event): void => {
  const customerIndex = list.customersList[event.target.dataset.id - 1];
  data = event.target.dataset.id - 1;
  id.value = customerIndex.id.toString();
  user.value = customerIndex.name;
  price.value = customerIndex.price.toString();
  amount.value = customerIndex.amount.toString();
  if (customerIndex instanceof DomesticCustomer) {
    customerType.selectedIndex = 0;
    domestic.style.display = "flex";
    foreign.style.display = "none";
    customers.value = customerIndex.customers;
    quota.value = customerIndex.quota.toString();
  }
  if (customerIndex instanceof ForeignCustomer) {
    customerType.selectedIndex = 1;
    domestic.style.display = "none";
    foreign.style.display = "flex";
    nationality.value = customerIndex.nationality;
  }
  btnAdd.style.display = "none";
  btnUpdate.style.display = "block";
};

// Edit Customer
export const editCustomer = (): void => {
  idValue = parseInt(id.value.trim());
  userValue = user.value.trim();
  priceValue = parseInt(price.value.trim());
  amountValue = parseInt(amount.value.trim());
  customersValue = customers.value.trim();
  quotaValue = parseInt(quota.value.trim());
  nationalityValue = nationality.value.trim();
  if (customerType.selectedIndex == 0 && checkInputs()) {
    let domesticCustomer = new DomesticCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      customersValue,
      quotaValue
    );
    list.editCustomer(data, domesticCustomer);
    snackBar("Update Success");
    form.reset();
  }
  if (customerType.selectedIndex == 1 && checkInputs()) {
    let foreignCustomer = new ForeignCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      nationalityValue
    );
    list.editCustomer(data, foreignCustomer);
    snackBar("Update Success");
    form.reset();
  }
  DisplayList(list.customersList, tBody, rows, current_page);
  SetupPagination(list.customersList, pagination_element, rows);
};
