// js/nav.js — single, robust listener
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".nav-toggle");
  if (!btn) return;

  // scope to the nav that *contains* this button (not the first nav on page)
  const nav = btn.closest(".site-nav");
  if (!nav) return;

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });

  // close on link click (mobile)
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    btn.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
});
