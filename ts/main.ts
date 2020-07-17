import { eventDialog, selectCustomer } from "./modal";
import { checkInputs, customerType } from "./validate";
import {
  btnAdd,
  btnUpdate,
  addCustomer,
  showAddButton,
  deleteCustomer,
  setValue,
  editCustomer,
} from "./CustomerManager";

// Variable
const btnShow = document.getElementById("btn-add");
const btnClose = document.getElementsByClassName("close")[0];

// Event delete and edit
export const addCustomerEventListeners = (): void => {
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
window.addEventListener("click", eventDialog.hideModalWindow);

// Event select TypeCustomer
customerType.addEventListener("change", selectCustomer);

// Event Check input and add customer
btnAdd.addEventListener("click", checkInputs);
btnAdd.addEventListener("click", addCustomer);
btnUpdate.addEventListener("click", editCustomer);
