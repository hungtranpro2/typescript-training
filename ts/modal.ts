import { customerType } from "./validate";
const modal = document.getElementById("myModal");
export const domestic = document.getElementById("domestic");
export const foreign = document.getElementById("foreign");
// Modal box
export const eventDialog = {
  showModal: (): void => {
    modal.style.display = "block";
  },
  hideModal: (): void => {
    modal.style.display = "none";
  },
  hideModalWindow: (): void => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  },
};

// Enum TypeCustomer
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

// Selected Customer
export function selectCustomer(): void {
  if ((<HTMLSelectElement>customerType).selectedIndex == 0) {
    domestic.style.display = "flex";
    foreign.style.display = "none";
  } else {
    domestic.style.display = "none";
    foreign.style.display = "flex";
  }
}
