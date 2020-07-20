import { customerType } from "./validate";
export const modal = document.getElementById("myModal");
export const domestic = document.getElementById("domestic");
export const foreign = document.getElementById("foreign");
// Modal box
export const eventDialog = {
  showModal: () => {
    modal.style.display = "block";
  },
  hideModal: () => {
    modal.style.display = "none";
  },
  hideModalWindow: () => {
    if (event.target === modal) {
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
export function selectCustomer() {
  if ((<HTMLSelectElement>customerType).selectedIndex === 0) {
    displaySelected("flex", "none");
  } else {
    displaySelected("none", "flex");
  }
}

export const displaySelected = (domes: string, fore: string) => {
  domestic.style.display = domes;
  foreign.style.display = fore;
};
