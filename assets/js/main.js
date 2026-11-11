// ==========================================================
// Instant Parfait – scripts communs à toutes les pages
// ==========================================================

// ---------- Lien actif dans la navigation ----------
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".ip-header .nav-link").forEach((lien) => {
  if (lien.getAttribute("href") === page) {
    lien.classList.add("active");
    lien.setAttribute("aria-current", "page");
  }
});

// ---------- Referme le menu mobile après un clic ----------
const menu = document.getElementById("menu");
if (menu && window.bootstrap) {
  menu.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", () => {
      bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
    });
  });
}

// ---------- Année dans le pied de page ----------
const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();

// ---------- Réalisations : filtres ----------
const filtres = document.querySelectorAll(".ip-filtre[data-filtre]");
if (filtres.length) {
  const afficher = (nom) => {
    if (!document.querySelector(`.ip-galerie[data-galerie="${nom}"]`)) nom = "tous";
    filtres.forEach((b) => {
      const actif = b.dataset.filtre === nom;
      b.classList.toggle("active", actif);
      b.setAttribute("aria-pressed", actif);
    });
    document.querySelectorAll(".ip-galerie").forEach((g) => {
      g.classList.toggle("d-none", g.dataset.galerie !== nom);
    });
  };
  filtres.forEach((b) =>
    b.addEventListener("click", () => {
      afficher(b.dataset.filtre);
      history.replaceState(null, "", "#" + b.dataset.filtre);
    })
  );
  afficher(location.hash.slice(1) || "tous");
}

// ---------- Réalisations : agrandissement des photos ----------
const lightbox = document.getElementById("lightbox");
if (lightbox && window.bootstrap) {
  const modal = new bootstrap.Modal(lightbox);
  const img = lightbox.querySelector("img");
  document.querySelectorAll(".ip-galerie-item").forEach((item) => {
    item.addEventListener("click", () => {
      const source = item.querySelector("img");
      img.src = source.src;
      img.alt = source.alt;
      modal.show();
    });
  });
}

// ---------- Formulaires (validation Bootstrap + message de confirmation) ----------
// Remarque : aucun envoi réel n'est fait pour l'instant (pas de serveur).
function brancherFormulaire(form, onSucces) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    form.classList.remove("was-validated");
    onSucces(form);
    form.reset();
  });
}

const formContact = document.getElementById("form-contact");
if (formContact) {
  brancherFormulaire(formContact, (form) => {
    const succes = document.getElementById("form-contact-succes");
    succes.querySelector("[data-nom]").textContent = form.nom.value.trim();
    succes.classList.remove("d-none");
    succes.focus();
  });
}

// ---------- Témoignages : note en étoiles + formulaire ----------
const note = document.querySelector(".ip-note");
if (note) {
  const champ = document.getElementById("avis-note");
  const boutons = note.querySelectorAll("button");
  const colorer = (n) => boutons.forEach((b, i) => b.classList.toggle("on", i < n));
  boutons.forEach((b, i) => {
    b.addEventListener("click", () => {
      champ.value = i + 1;
      colorer(i + 1);
    });
  });
  colorer(Number(champ.value));
}

const formAvis = document.getElementById("form-avis");
if (formAvis) {
  brancherFormulaire(formAvis, () => {
    document.getElementById("form-avis-succes").classList.remove("d-none");
    formAvis.classList.add("d-none");
  });
  const modalAvis = document.getElementById("modal-avis");
  modalAvis.addEventListener("hidden.bs.modal", () => {
    document.getElementById("form-avis-succes").classList.add("d-none");
    formAvis.classList.remove("d-none");
    document.querySelectorAll(".ip-note button").forEach((b, i) => b.classList.toggle("on", i < 5));
  });
  // Ouverture directe via le lien temoignages.html#avis
  if (location.hash === "#avis" && window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(modalAvis).show();
  }
}
