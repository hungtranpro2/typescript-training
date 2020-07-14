const id = document.getElementById("id");
const user = document.getElementById("name");
const price = document.getElementById("price");
const amount = document.getElementById("amount");
const customers = document.getElementById("customers");
const quota = document.getElementById("quota");
const nationality = document.getElementById("nationality");

export function checkInputs() {
  const idValue = (<HTMLInputElement>id).value.trim();
  const userValue = (<HTMLInputElement>user).value.trim();
  const priceValue = (<HTMLInputElement>price).value.trim();
  const amountValue = (<HTMLInputElement>amount).value.trim();
  const customersValue = (<HTMLInputElement>customers).value.trim();
  const quotaValue = (<HTMLInputElement>quota).value.trim();
  const nationalityValue = (<HTMLInputElement>nationality).value.trim();

  checkEmpty(id, idValue);
  checkEmpty(user, userValue);
  checkEmpty(price, priceValue);
  checkEmpty(amount, amountValue);
  checkEmpty(customers, customersValue);
  checkEmpty(quota, quotaValue);
  checkEmpty(nationality, nationalityValue);
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
  } else {
    setSuccessFor(input);
  }
}
