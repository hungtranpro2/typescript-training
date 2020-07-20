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
import { displayList, currentPage, rowsPerPage } from "./pagination";
import { displaySelected, modal } from "./modal";

// Variable
export let list = new CustomersList();
const lists = list.customersList;
export let tBody = document.getElementById("tBodyBills");
export const btnAdd = document.getElementById("btn-submit");
export const btnUpdate = document.getElementById("btn-update");
const form = <HTMLFormElement>document.getElementById("form");

let idValue: number;
let userValue: string;
let priceValue: number;
let amountValue: number;
let customersValue: string;
let quotaValue: number;
let nationalityValue: string;

// Show Modal
export function showAddButton(): void {
  lists.length === 0
    ? (id.value = "1")
    : (id.value = (lists[lists.length - 1].id + 1).toString());
  btnAdd.style.display = "block";
  btnUpdate.style.display = "none";
}

// Add Customer
export function addCustomer(): void {
  getValue();
  if (customerType.selectedIndex === 0 && checkInputs()) {
    let domesticCustomer = new DomesticCustomer({
      id: idValue,
      name: userValue,
      price: priceValue,
      amount: amountValue,
      customers: customersValue,
      quota: quotaValue,
    });
    afterAdd(domesticCustomer, 0);
  }
  if (customerType.selectedIndex === 1 && checkInputs()) {
    let foreignCustomer = new ForeignCustomer({
      id: idValue,
      name: userValue,
      price: priceValue,
      amount: amountValue,
      nationality: nationalityValue,
    });
    afterAdd(foreignCustomer, 1);
  }

  displayList(lists, tBody, rowsPerPage, currentPage);
}

const afterAdd = (
  customer: DomesticCustomer | ForeignCustomer,
  index: number
) => {
  list.addCustomer(customer);
  snackBar("Add Success");
  form.reset();
  customerType.selectedIndex = index;
  modal.style.display = "none";
};

const getValue = () => {
  idValue = parseInt(id.value.trim());
  userValue = user.value.trim();
  priceValue = parseInt(price.value.trim());
  amountValue = parseInt(amount.value.trim());
  customersValue = customers.value.trim();
  quotaValue = parseInt(quota.value.trim());
  nationalityValue = nationality.value.trim();
};

// Delete Customer
export const deleteCustomer = (event) => {
  const customerIndex = event.target.dataset.id;
  if (confirm("Are you sure?")) {
    lists.splice(customerIndex - 1, 1);
    snackBar("Delete Success");
    displayList(lists, tBody, rowsPerPage, currentPage);
  }
};

// Set value
let data: number;
export const setValue = (event) => {
  const customerIndex = lists[event.target.dataset.id - 1];
  data = event.target.dataset.id - 1;
  id.value = customerIndex.id.toString();
  user.value = customerIndex.name;
  price.value = customerIndex.price.toString();
  amount.value = customerIndex.amount.toString();
  if (customerIndex instanceof DomesticCustomer) {
    customerType.selectedIndex = 0;
    displaySelected("flex", "none");
    customers.value = customerIndex.customers;
    quota.value = customerIndex.quota.toString();
  }
  if (customerIndex instanceof ForeignCustomer) {
    customerType.selectedIndex = 1;
    displaySelected("none", "flex");
    nationality.value = customerIndex.nationality;
  }
  btnAdd.style.display = "none";
  btnUpdate.style.display = "block";
};

const afterEdit = (customer: DomesticCustomer | ForeignCustomer) => {
  list.editCustomer(data, customer);
  snackBar("Update Success");
  form.reset();
  modal.style.display = "none";
};

// Edit Customer
export const editCustomer = () => {
  getValue();
  if (customerType.selectedIndex === 0 && checkInputs()) {
    let domesticCustomer = new DomesticCustomer({
      id: idValue,
      name: userValue,
      price: priceValue,
      amount: amountValue,
      customers: customersValue,
      quota: quotaValue,
    });
    afterEdit(domesticCustomer);
  }
  if (customerType.selectedIndex === 1 && checkInputs()) {
    let foreignCustomer = new ForeignCustomer({
      id: idValue,
      name: userValue,
      price: priceValue,
      amount: amountValue,
      nationality: nationalityValue,
    });
    afterEdit(foreignCustomer);
  }
  displayList(lists, tBody, rowsPerPage, currentPage);
};
