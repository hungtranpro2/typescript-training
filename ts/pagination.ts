import {loadData, tBody} from "./main";
const pagination_element = document.getElementById("pagination");
export let current_page = 1;
export let rows = 5;

export function DisplayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  loadData(paginatedItems);
}

export function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

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

