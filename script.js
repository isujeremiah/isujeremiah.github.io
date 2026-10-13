const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.querySelector(".sr-only").textContent = isOpen
      ? "Open navigation"
      : "Close navigation";
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.querySelector(".sr-only").textContent = "Open navigation";
      navigation.classList.remove("is-open");
    }
  });
}

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const paperUpload = document.querySelector("#paper-upload");
const paperStatus = document.querySelector("#paper-status");
const paperFileLink = document.querySelector("#paper-file-link");
const paperFileName = document.querySelector("#paper-file-name");
let paperObjectUrl;

if (
  paperUpload instanceof HTMLInputElement &&
  paperStatus instanceof HTMLElement &&
  paperFileLink instanceof HTMLAnchorElement &&
  paperFileName instanceof HTMLElement
) {
  paperUpload.addEventListener("change", () => {
    const file = paperUpload.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      paperStatus.textContent = "Please choose a PDF file.";
      paperUpload.value = "";
      return;
    }

    if (paperObjectUrl) {
      URL.revokeObjectURL(paperObjectUrl);
    }

    paperObjectUrl = URL.createObjectURL(file);
    paperFileLink.href = paperObjectUrl;
    paperFileName.textContent = file.name;
    paperFileLink.hidden = false;
    paperStatus.textContent = "Paper PDF ready to view.";
  });
}
