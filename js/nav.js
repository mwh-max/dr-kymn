// js/nav.js
(function () {
  const btn = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-menu");
  if (!btn || !menu) return;

  const OPEN_CLASS = "open";
  const BODY_OPEN = "nav-open";
  const BREAKPOINT = 768;

  function openMenu() {
    btn.setAttribute("aria-expanded", "true");
    menu.classList.add(OPEN_CLASS);
    document.body.classList.add(BODY_OPEN);
  }

  function closeMenu() {
    btn.setAttribute("aria-expanded", "false");
    menu.classList.remove(OPEN_CLASS);
    document.body.classList.remove(BODY_OPEN);
  }

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  // Close when a link inside the menu is clicked
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If resized to desktop, reset mobile state
  window.addEventListener("resize", () => {
    if (window.innerWidth > BREAKPOINT) closeMenu();
  });
})();
