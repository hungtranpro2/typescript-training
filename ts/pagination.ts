// Import file
import { addCustomerEventListeners } from "./main";
import { DomesticCustomer } from "./DomesticCustomer";
import { ForeignCustomer } from "./ForeignCustomer";
import { tBody, list } from "./CustomerManager";
import { Customer } from "./Customer";

// Variable
export let currentPage = 1;
export let rowsPerPage = 5;
const paginationElement = document.getElementById("pagination");

// Display to table
export function displayList(
  items: Customer[],
  wrapper: HTMLElement,
  rowsPerPage: number,
  page: number
) {
  wrapper.innerHTML = "";
  page--;

  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let paginatedItems = items.slice(start, end);

  loadData(paginatedItems);
  setupPagination(list.customersList, paginationElement, rowsPerPage);
}

// setup pagination
export function setupPagination(
  items: Customer[],
  wrapper: HTMLElement,
  rowsPerPage: number
): void {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rowsPerPage);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

// Button pagination
function paginationButton(page: number, items: Customer[]): HTMLButtonElement {
  let button = document.createElement("button");
  button.innerText = page.toString();

  if (currentPage === page) button.classList.add("active");

  button.addEventListener("click", function () {
    currentPage = page;
    displayList(items, tBody, rowsPerPage, currentPage);

    let currentBtn = document.querySelector(".page-numbers button.active");
    currentBtn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

// Load data to table
function loadData(items: Customer[]) {
  let index: number = 0;
  for (let customer of items) {
    if (customer instanceof DomesticCustomer) {
      index++;
      tBody.innerHTML += addTableRow({
        id: customer.id,
        name: customer.name,
        price: customer.price,
        amount: customer.amount,
        customers: customer.customers,
        quota: customer.quota,
        nationality: "",
        cash: customer.cash(),
        index: index,
        type: "Domestic",
      });
    }
    if (customer instanceof ForeignCustomer) {
      index++;
      tBody.innerHTML += addTableRow({
        id: customer.id,
        name: customer.name,
        price: customer.price,
        amount: customer.amount,
        customers: "",
        quota: "",
        nationality: customer.nationality,
        cash: customer.cash(),
        index: index,
        type: "Foreign",
      });
    }
  }
  addCustomerEventListeners();
}
type MenuOptions = {
  id: number;
  name: string;
  price: number;
  amount: number;
  customers: string;
  quota: any;
  nationality: string;
  cash: number;
  index: number;
  type: string;
};
function addTableRow(options: MenuOptions): string {
  return ` <tr>
  <td>${options.id}</td>
  <td>${options.type}</td>
  <td>${options.name}</td>
  <td>${options.price}</td>
  <td>${options.amount}</td>
  <td>${options.customers}</td>
  <td>${options.quota}</td>
  <td>${options.nationality}</td>
  <td>${options.cash}</td>
  <td class = btn-group>
  <button type="button" class="btn btn--edit" data-id="${options.index}">Edit</button>
  <button type="button" class="btn btn--delete" data-id="${options.index}">Delete</button>
  </td>
</tr>`;
}
