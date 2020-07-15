import { eventDialog } from "./modal";
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
import { CustomersList } from "./CustomersList";
import { DomesticCustomer } from "./DomesticCustomer";
import { ForeignCustomer } from "./ForeignCustomer";
import { DisplayList, SetupPagination,current_page,rows } from './pagination';

// Variable
const btnShow = document.getElementById("btn-add");
const btnClose = document.getElementsByClassName("close")[0];
const form = document.getElementById("form");
const domestic = document.getElementById("domestic");
const foreign = document.getElementById("foreign");
const btnAdd = document.getElementById("btn-submit");
const btnUpdate = document.getElementById("btn-update");
const pagination_element = document.getElementById("pagination");
export let tBody = document.getElementById("tBodyBills");

let idValue: number;
let userValue: string;
let priceValue: number;
let amountValue: number;
let customersValue: string;
let quotaValue: number;
let nationalityValue: string;

export let list = new CustomersList();

// function add customer
function addCustomer() {
  idValue = list.customersList.length + 1;
  userValue = (<HTMLInputElement>user).value.trim();
  priceValue = parseInt((<HTMLInputElement>price).value.trim());
  amountValue = parseInt((<HTMLInputElement>amount).value.trim());
  customersValue = (<HTMLInputElement>customers).value.trim();
  quotaValue = parseInt((<HTMLInputElement>quota).value.trim());
  nationalityValue = (<HTMLInputElement>nationality).value.trim();
  if ((<HTMLSelectElement>customerType).selectedIndex == 0 && checkInputs()) {
    let domesticCustomer = new DomesticCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      customersValue,
      quotaValue
    );
    list.addCustomer(domesticCustomer);
    (<HTMLFormElement>form).reset();
    (<HTMLInputElement>document.getElementById("id")).value = (
      list.customersList.length + 1
    ).toString();
    (<HTMLSelectElement>customerType).selectedIndex = 0
  }
  if ((<HTMLSelectElement>customerType).selectedIndex == 1 && checkInputs()) {
    let foreignCustomer = new ForeignCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      nationalityValue
    );
    list.addCustomer(foreignCustomer);
    (<HTMLFormElement>form).reset();
    (<HTMLInputElement>document.getElementById("id")).value = (
      list.customersList.length + 1
    ).toString();
    (<HTMLSelectElement>customerType).selectedIndex = 1
  }
  DisplayList(list.customersList, tBody, rows, current_page);
  SetupPagination(list.customersList,pagination_element,rows)
}

// Enum customerType
enum type {
  Domestic = 1,
  Foreign = 2,
}
customerType.innerHTML = "";
for (const x in type) {
  if (isNaN(Number(x))) {
    customerType.innerHTML += `<option>${x}</option>`;
  }
}

// Selected TypeCustomer

function selectCustomer() {
  if ((<HTMLSelectElement>customerType).selectedIndex == 0) {
    domestic.style.display = "flex";
    foreign.style.display = "none";
  } else {
    domestic.style.display = "none";
    foreign.style.display = "flex";
  }
}

// Add data to Table
export function loadData(items) {
  let index: number = 0
  tBody.innerHTML = "";
  for (let customer of items) {
    if (customer instanceof DomesticCustomer) {
      index++;
      tBody.innerHTML += `
      <tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.price}</td>
        <td>${customer.amount}</td>
        <td>${customer.customers}</td>
        <td>${customer.quota}</td>
        <td></td>
        <td>${customer.cash()}</td>
        <td class = btn-group>
        <button type="button" class="btn btn--edit" data-id="${
          index
        }">Edit</button>
        <button type="button" class="btn btn--delete" data-id="${
          index
        }">Delete</button>
        </td>
      </tr>
      `;
    } else if (customer instanceof ForeignCustomer) {
      index++;
      tBody.innerHTML += `
      <tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.price}</td>
        <td>${customer.amount}</td>
        <td></td>
        <td></td>
        <td>${customer.nationality}</td>
        <td>${customer.cash()}</td>
        <td class = btn-group>
        <button type="button" class="btn btn--edit" data-id="${
          index
        }">Edit</button>
        <button type="button" class="btn btn--delete" data-id="${
          index
        }">Delete</button>
        </td>
      </tr>
      `;
    }
  }
  addCustomerEventListeners();
}

// Delete Customer
const deleteCustomer = (e) => {
  const customerIndex = e.target.dataset.id ;
  list.customersList.splice(customerIndex - 1 , 1);
  DisplayList(list.customersList, tBody, rows, current_page);
  SetupPagination(list.customersList,pagination_element,rows)
};

let data: number;

// Set value Customer
const setValue = (e) => {
  const customerIndex = list.customersList[e.target.dataset.id - 1];
  data = e.target.dataset.id - 1;
  (<HTMLInputElement>(
    document.getElementById("id")
  )).value = customerIndex.id.toString();
  (<HTMLInputElement>document.getElementById("name")).value =
    customerIndex.name;
  (<HTMLInputElement>(
    document.getElementById("price")
  )).value = customerIndex.price.toString();
  (<HTMLInputElement>(
    document.getElementById("amount")
  )).value = customerIndex.amount.toString();
  if (customerIndex instanceof DomesticCustomer) {
    (<HTMLSelectElement>customerType).selectedIndex = 0;
    domestic.style.display = "flex";
    foreign.style.display = "none";
    (<HTMLInputElement>document.getElementById("customers")).value =
      customerIndex.customers;
    (<HTMLInputElement>(
      document.getElementById("quota")
    )).value = customerIndex.quota.toString();
  } else if (customerIndex instanceof ForeignCustomer) {
    (<HTMLSelectElement>customerType).selectedIndex = 1;
    domestic.style.display = "none";
    foreign.style.display = "flex";
    (<HTMLInputElement>document.getElementById("nationality")).value =
      customerIndex.nationality;
  }
  btnAdd.style.display = "none";
  btnUpdate.style.display = "block";
};

// Show add
function showAddButton() {
  (<HTMLInputElement>document.getElementById("id")).value = (
    list.customersList.length + 1
  ).toString();
  btnAdd.style.display = "block";
  btnUpdate.style.display = "none";
}

// Edit customer
const editCustomer = (e) => {
  idValue = parseInt((<HTMLInputElement>id).value.trim());
  userValue = (<HTMLInputElement>user).value.trim();
  priceValue = parseInt((<HTMLInputElement>price).value.trim());
  amountValue = parseInt((<HTMLInputElement>amount).value.trim());
  customersValue = (<HTMLInputElement>customers).value.trim();
  quotaValue = parseInt((<HTMLInputElement>quota).value.trim());
  nationalityValue = (<HTMLInputElement>nationality).value.trim();
  if ((<HTMLSelectElement>customerType).selectedIndex == 0 && checkInputs()) {
    let domesticCustomer = new DomesticCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      customersValue,
      quotaValue
    );
    list.editCustomer(data, domesticCustomer);
    (<HTMLFormElement>form).reset();
  }
  if ((<HTMLSelectElement>customerType).selectedIndex == 1 && checkInputs()) {
    let foreignCustomer = new ForeignCustomer(
      idValue,
      userValue,
      priceValue,
      amountValue,
      nationalityValue
    );
    list.editCustomer(data, foreignCustomer);
    (<HTMLFormElement>form).reset();
  }
  DisplayList(list.customersList, tBody, rows, current_page);
  SetupPagination(list.customersList,pagination_element,rows)
};

// Event delete and edit
const addCustomerEventListeners = () => {
  document
    .querySelectorAll(".btn--delete")
    .forEach((button) => button.addEventListener("click", deleteCustomer));
  document
    .querySelectorAll(".btn--edit")
    .forEach((button) =>
      button.addEventListener("click", eventDialog.showModal)
    );
  document
    .querySelectorAll(".btn--edit")
    .forEach((button) => button.addEventListener("click", setValue));
};

// Event Modal box
btnShow.addEventListener("click", eventDialog.showModal);
btnShow.addEventListener("click", showAddButton);
btnClose.addEventListener("click", eventDialog.hideModal);
window.addEventListener("click", eventDialog.hideModal2);
// Event select TypeCustomer
customerType.addEventListener("change", selectCustomer);

// Event Check input and add customer
btnAdd.addEventListener("click", checkInputs);
btnAdd.addEventListener("click", addCustomer);
btnUpdate.addEventListener("click", editCustomer);
