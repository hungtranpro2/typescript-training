let modal = document.getElementById("myModal");

// Modal box
export const eventDialog = {
  showModal: () => {
    modal.style.display = "block";
  },
  hideModal: () => {
    modal.style.display = "none";
  },
  hideModal2: () => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  },
};
