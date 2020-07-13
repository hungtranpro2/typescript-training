import { display, close, close2 } from '../model';


const bills = [
  {
    idCustomer: "01",
    name: "ABC",
    price: "1500",
    amount: "5",
    customers: "personal",
    quota: "50",
  },
  {
    idCustomer: "02",
    name: "asdsa",
    price: "1500",
    amount: "5",
    customers: "personal",
    quota: "50",
  }
];
let customerType = document.getElementsByClassName("customer-select");

for (let i = 0; i < customerType.length; i++) {
  customerType[i].addEventListener("change", () => {
    let domestic = document.getElementsByClassName("domestic");
    let foreign = document.getElementsByClassName("foreign");

    if (customerType[i].selectedIndex == 0) {
      console.log(customerType[i].value);
      for (const item of domestic) {
        item.style.display = "flex";
      }
      for (const item of foreign) {
        item.style.display = "none";
      }
    } else {
      console.log(customerType[i].value);
      for (const item of foreign) {
        item.style.display = "flex";
      }
      for (const item of domestic) {
        item.style.display = "none";
      }
    }
  });
}

// do du lieu
let btnShow = document.getElementById('btn-show')
function load(){
  let tBody = document.getElementById('tBodyBills');
  tBody.innerHTML = "";
  for (const bill of bills) {
    tBody.innerHTML += `
    <tr>
      <td>${bill.idCustomer}</td>
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
    `
  }
}

btnShow.addEventListener('click',load);

