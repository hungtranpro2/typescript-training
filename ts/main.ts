import { eventDialog } from "./model";
import { checkInputs } from './validate';


const btnShow = document.getElementById("btn-add");
const btnClose = document.getElementsByClassName("close")[0];
const btnPush = document.getElementById("btn-show");
const customerType = document.getElementById("customer-select");
const domestic = document.getElementById("domestic");
const foreign = document.getElementById("foreign");
const btnAdd = document.getElementById("btn-submit");



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

// Array
const bills = [
  {
    id: "01",
    name: "ABC",
    price: "1500",
    amount: "5",
    customers: "personal",
    quota: "50",
  },
  {
    id: "02",
    name: "XYZ",
    price: "1500",
    amount: "5",
    customers: "personal",
    quota: "50",
  },
];

// Selected TypeCustomer

function selectCustomer() {
  if((<HTMLSelectElement>customerType).selectedIndex == 0){
    domestic.style.display = "flex"
    foreign.style.display = "none"
  }else{
    domestic.style.display = "none"
    foreign.style.display = "flex"
  }
}


// do du lieu

function load() {
  let tBody = document.getElementById("tBodyBills");
  tBody.innerHTML = "";
  for (const bill of bills) {
    tBody.innerHTML += `
    <tr>
      <td>${bill.id}</td>
      <td>${bill.name}</td>
      <td>${bill.price}</td>
      <td>${bill.amount}</td>
      <td>${bill.customers}</td>
      <td>${bill.quota}</td>
      <td></td>
      <td></td>
      <td class = btn-group>
      <button type="button" class="btn btn--edit">Edit</button>
      <button type="button" class="btn btn--delete">Delete</button>
      </td>
    </tr>
    `;
  }
}

// Event Modal box
btnShow.addEventListener("click", eventDialog.showModal);
btnClose.addEventListener("click", eventDialog.hideModal);
window.addEventListener("click", eventDialog.hideModal2);
// Event select TypeCustomer
customerType.addEventListener('change',selectCustomer);
// Event push array
btnPush.addEventListener("click", load);
// Event Check input
btnAdd.addEventListener('click',checkInputs);