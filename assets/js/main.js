// Menu mobile / tablette
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-mobile");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const ouvert = menu.classList.toggle("hidden") === false;
    toggle.setAttribute("aria-expanded", ouvert);
    toggle.querySelector("[data-icon=open]").classList.toggle("hidden", ouvert);
    toggle.querySelector("[data-icon=close]").classList.toggle("hidden", !ouvert);
  });
}

// Lien actif dans la navigation (selon la page courante)
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-nav] a").forEach((lien) => {
  if (lien.getAttribute("href") === page) {
    lien.classList.add("bg-gold", "text-white");
    lien.setAttribute("aria-current", "page");
  }
});

// Année dans le pied de page
const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();
