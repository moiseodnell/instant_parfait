// Année dans le pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const ouvert = nav.classList.toggle("ouvert");
  toggle.setAttribute("aria-expanded", ouvert);
});

nav.querySelectorAll("a").forEach((lien) => {
  lien.addEventListener("click", () => {
    nav.classList.remove("ouvert");
    toggle.setAttribute("aria-expanded", false);
  });
});

// Bouton d'accroche
const cta = document.getElementById("cta");
const message = document.getElementById("message");

cta.addEventListener("click", () => {
  message.textContent = "Bienvenue ! Profitez de l'instant ✨";
  message.hidden = false;
  document.getElementById("services").scrollIntoView();
});

// Formulaire de contact (simulation, rien n'est envoyé)
const form = document.getElementById("contact-form");
const retour = document.getElementById("form-retour");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = form.nom.value.trim();
  retour.textContent = `Merci ${nom}, votre message a bien été reçu.`;
  retour.hidden = false;
  form.reset();
});
