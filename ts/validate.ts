// Import file
import { CustomersList } from "./CustomersList";
import { list } from "./CustomerManager";

// Variable
export const id = <HTMLInputElement>document.getElementById("id");
export const user = <HTMLInputElement>document.getElementById("name");
export const price = <HTMLInputElement>document.getElementById("price");
export const amount = <HTMLInputElement>document.getElementById("amount");
export const customers = <HTMLInputElement>document.getElementById("customers");
export const quota = <HTMLInputElement>document.getElementById("quota");
export const nationality = <HTMLInputElement>(
  document.getElementById("nationality")
);
export const customerType = <HTMLSelectElement>(
  document.getElementById("customer-select")
);
let check: boolean;

// Check input
export function checkInputs(): boolean {
  const userValue = user.value.trim();
  const priceValue = price.value.trim();
  const amountValue = amount.value.trim();
  const customersValue = customers.value.trim();
  const quotaValue = quota.value.trim();
  const nationalityValue = nationality.value.trim();
  check = true;

  checkEmpty(user, userValue);
  checkEmpty(price, priceValue);
  checkNegative(price, priceValue);
  checkEmpty(amount, amountValue);
  checkNegative(amount, amountValue);

  if ((<HTMLSelectElement>customerType).selectedIndex == 0) {
    checkEmpty(customers, customersValue);
    checkEmpty(quota, quotaValue);
    checkNegative(quota, quotaValue);
  }
  if ((<HTMLSelectElement>customerType).selectedIndex == 1) {
    checkEmpty(nationality, nationalityValue);
  }

  return check;
}

// Error
function setErrorFor(input: HTMLInputElement, message: string): void {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  small.style.visibility = "visible";
}

// Success
function setSuccessFor(input: HTMLInputElement): void {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = "";
  small.style.visibility = "hidden";
}

// Check empty
function checkEmpty(input: HTMLInputElement, value: string): void {
  if (value == "") {
    setErrorFor(input, `${input.name} cannot be blank`);
    check = false;
  } else {
    setSuccessFor(input);
  }
}

// Check positive negative
function checkNegative(input: HTMLInputElement, value: string): void {
  if (parseInt(value) < 0) {
    setErrorFor(input, `${input.name} must be a positive number`);
    check = false;
  }
}
