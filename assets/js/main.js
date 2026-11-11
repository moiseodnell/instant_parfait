// Lien actif dans la navigation (selon la page courante)
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".ip-header .nav-link").forEach((lien) => {
  if (lien.getAttribute("href") === page) {
    lien.classList.add("active");
    lien.setAttribute("aria-current", "page");
  }
});

// Referme le menu mobile après un clic sur un lien
const menu = document.getElementById("menu");
if (menu && window.bootstrap) {
  menu.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", () => {
      bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
    });
  });
}

// Année dans le pied de page
const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();
