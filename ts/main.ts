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
import { Customer } from "./Customer";
import { CustomersList } from "./CustomersList";
import { DomesticCustomer } from "./DomesticCustomer";
import { ForeignCustomer } from './ForeignCustomer';


const btnShow = document.getElementById("btn-add");
const btnClose = document.getElementsByClassName("close")[0];
const btnPush = document.getElementById("btn-show");
const form = document.getElementById('form');
const domestic = document.getElementById("domestic");
const foreign = document.getElementById("foreign");
const btnAdd = document.getElementById("btn-submit");

export let list = new CustomersList();

// function add customer
function addCustomer() {
  const idValue: number = parseInt((<HTMLInputElement>id).value.trim());
  const userValue: string = (<HTMLInputElement>user).value.trim();
  const priceValue: number = parseInt((<HTMLInputElement>price).value.trim());
  const amountValue: number = parseInt((<HTMLInputElement>amount).value.trim());
  const customersValue: string = (<HTMLInputElement>customers).value.trim();
  const quotaValue: number = parseInt((<HTMLInputElement>quota).value.trim());
  const nationalityValue: string = (<HTMLInputElement>nationality).value.trim();
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
    (<HTMLFormElement>form).reset()
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
    (<HTMLFormElement>form).reset()
  }
  loadData();
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
function loadData() {
  let tBody = document.getElementById("tBodyBills");
  tBody.innerHTML = "";
  for (let customer of list.customersList) {
    if (customer instanceof DomesticCustomer) {
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
        <button type="button" class="btn btn--edit">Edit</button>
        <button type="button" class="btn btn--delete">Delete</button>
        </td>
      </tr>
      `;
    } else if(customer instanceof ForeignCustomer){
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
        <button type="button" class="btn btn--edit">Edit</button>
        <button type="button" class="btn btn--delete">Delete</button>
        </td>
      </tr>
      `;
    }
  }
}


// Event Modal box
btnShow.addEventListener("click", eventDialog.showModal);
btnClose.addEventListener("click", eventDialog.hideModal);
window.addEventListener("click", eventDialog.hideModal2);
// Event select TypeCustomer
customerType.addEventListener("change", selectCustomer);

// Event Check input and add customer
btnAdd.addEventListener("click", checkInputs);
btnAdd.addEventListener("click", addCustomer);
