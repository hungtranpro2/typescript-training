import { CustomersList } from './CustomersList';
import { list } from './main';

export const id = document.getElementById("id");
export const user = document.getElementById("name");
export const price = document.getElementById("price");
export const amount = document.getElementById("amount");
export const customers = document.getElementById("customers");
export const quota = document.getElementById("quota");
export const nationality = document.getElementById("nationality");
export const customerType = document.getElementById("customer-select");
let check: boolean;

export function checkInputs() {
  const idValue = (<HTMLInputElement>id).value.trim();
  const userValue = (<HTMLInputElement>user).value.trim();
  const priceValue = (<HTMLInputElement>price).value.trim();
  const amountValue = (<HTMLInputElement>amount).value.trim();
  const customersValue = (<HTMLInputElement>customers).value.trim();
  const quotaValue = (<HTMLInputElement>quota).value.trim();
  const nationalityValue = (<HTMLInputElement>nationality).value.trim();
  check = true;


  checkEmpty(user, userValue);
  checkEmpty(price, priceValue);
  checkNegative(price,priceValue)
  checkEmpty(amount, amountValue);
  checkNegative(amount,amountValue)

  if ((<HTMLSelectElement>customerType).selectedIndex == 0) {
    checkEmpty(customers, customersValue);
    checkEmpty(quota, quotaValue);
    checkNegative(quota,quotaValue);
  }
  if ((<HTMLSelectElement>customerType).selectedIndex == 1) {
    checkEmpty(nationality, nationalityValue);
  }


  return check;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  small.style.visibility = "visible";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = "";
  small.style.visibility = "hidden";
}

function checkEmpty(input, value) {
  if (value == "") {
    setErrorFor(input, `${input.name} cannot be blank`);
    check = false;
  } else {
    setSuccessFor(input);
  }
}

function checkNegative(input,value){
  if (parseInt(value)<0) {
    setErrorFor(input,`${input.name} must be a positive number`);
    check = false
  }
}
