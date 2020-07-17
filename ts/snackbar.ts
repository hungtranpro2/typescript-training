export function snackBar(message: string): void {
  // Get the snackbar DIV
  var toast = document.getElementById("snackbar");

  // Add the "show" class to DIV
  toast.className = "show";
  toast.innerHTML = message;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function (): void {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
