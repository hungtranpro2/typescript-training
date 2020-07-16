// Import file
import { addCustomerEventListeners } from "./main";
import { DomesticCustomer } from "./DomesticCustomer";
import { ForeignCustomer } from "./ForeignCustomer";
import { tBody } from "./CustomerManager";
import { Customer } from "./Customer";
import { customers, quota, nationality } from "./validate";

// Variable
export let current_page = 1;
export let rows = 5;

// Display to table
export function DisplayList(
  items: Customer[],
  wrapper: HTMLElement,
  rows_per_page: number,
  page: number
): void {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  loadData(paginatedItems);
}

// setup pagination
export function SetupPagination(
  items: Customer[],
  wrapper: HTMLElement,
  rows_per_page: number
): void {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

// Button pagination
function PaginationButton(page: number, items: Customer[]): HTMLButtonElement {
  let button = document.createElement("button");
  button.innerText = page.toString();

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, tBody, rows, current_page);

    let current_btn = document.querySelector(".page-numbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

// Load data to table
function loadData(items: Customer[]): void {
  let index: number = 0;
  for (let customer of items) {
    if (customer instanceof DomesticCustomer) {
      index++;
      tBody.innerHTML += addTableRow(
        customer.id,
        customer.name,
        customer.price,
        customer.amount,
        customer.customers,
        customer.quota,
        "",
        customer.cash(),
        index,
        "Domestic"
      );
    } else if (customer instanceof ForeignCustomer) {
      index++;
      tBody.innerHTML += addTableRow(
        customer.id,
        customer.name,
        customer.price,
        customer.amount,
        "",
        "",
        customer.nationality,
        customer.cash(),
        index,
        "Foreign"
      );
    }
  }
  addCustomerEventListeners();
}

function addTableRow(
  id: number,
  name: string,
  price: number,
  amount: number,
  customers: string,
  quota: any,
  nationality: string,
  cash: number,
  index: number,
  type: string
): string {
  return ` <tr>
  <td>${id}</td>
  <td>${type}</td>
  <td>${name}</td>
  <td>${price}</td>
  <td>${amount}</td>
  <td>${customers}</td>
  <td>${quota}</td>
  <td>${nationality}</td>
  <td>${cash}</td>
  <td class = btn-group>
  <button type="button" class="btn btn--edit" data-id="${index}">Edit</button>
  <button type="button" class="btn btn--delete" data-id="${index}">Delete</button>
  </td>
</tr>`;
}
