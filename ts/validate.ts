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

  if ((<HTMLSelectElement>customerType).selectedIndex === 0) {
    checkEmpty(customers, customersValue);
    checkEmpty(quota, quotaValue);
    checkNegative(quota, quotaValue);
  }
  if ((<HTMLSelectElement>customerType).selectedIndex === 1) {
    checkEmpty(nationality, nationalityValue);
  }

  return check;
}

const setSuccessOrErrorFor = (
  input: HTMLInputElement,
  message: string,
  style: string
) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  small.style.visibility = style;
};

// Check empty
function checkEmpty(input: HTMLInputElement, value: string) {
  if (!value) {
    setSuccessOrErrorFor(input, `${input.name} cannot be blank`,"visible");
    check = false;
  } else {
    setSuccessOrErrorFor(input, "","hidden");
  }
}

// Check positive negative
function checkNegative(input: HTMLInputElement, value: string) {
  if (parseInt(value) < 0) {
    setSuccessOrErrorFor(input, `${input.name} must be a positive number`,"visible");
    check = false;
  }
}
