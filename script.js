const menuCheckbox = document.querySelector("#check");
const openMenuControl = document.querySelector(".btn_one label");
const closeMenuControl = document.querySelector(".btn_two label");
const sidebar = document.querySelector(".sidebar_menu");

if (menuCheckbox && openMenuControl && closeMenuControl && sidebar) {
  const menuControls = [openMenuControl, closeMenuControl];

  menuControls.forEach((control) => {
    control.setAttribute("role", "button");
    control.setAttribute("tabindex", "0");
  });
  openMenuControl.setAttribute("aria-label", "Open navigation menu");
  closeMenuControl.setAttribute("aria-label", "Close navigation menu");
  openMenuControl.setAttribute("aria-controls", "sidebar-menu");
  closeMenuControl.setAttribute("aria-controls", "sidebar-menu");
  sidebar.id = "sidebar-menu";

  const updateMenuState = () => {
    const isOpen = menuCheckbox.checked;
    openMenuControl.setAttribute("aria-expanded", String(isOpen));
    closeMenuControl.setAttribute("aria-expanded", String(isOpen));
    sidebar.setAttribute("aria-hidden", String(!isOpen));
    sidebar.inert = !isOpen;
  };

  menuCheckbox.addEventListener("change", updateMenuState);

  menuControls.forEach((control) => {
    control.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        menuCheckbox.checked = !menuCheckbox.checked;
        menuCheckbox.dispatchEvent(new Event("change"));
      }

    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuCheckbox.checked) {
      menuCheckbox.checked = false;
      menuCheckbox.dispatchEvent(new Event("change"));
      openMenuControl.focus();
    }
  });

  sidebar.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menuCheckbox.checked = false;
      menuCheckbox.dispatchEvent(new Event("change"));
    });
  });

  updateMenuState();
}