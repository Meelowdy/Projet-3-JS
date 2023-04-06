async function getElementAPI() {
  try {
    let response = await fetch("http://localhost:5678/api/works");
    let data = await response.json();
    data.forEach((element) => {
      let imgUrl = element.imageUrl;
      let titleimg = element.title;
      document.getElementById(
        "imgProjet"
      ).innerHTML += `<figure class="projectItem" data-figure=${element.categoryId}>
                <img src=${imgUrl} alt=${titleimg}>
                <figcaption>${titleimg}</figcaption>
            </figure>`;
    });
    const buttonFilter = document.querySelectorAll("button");
    const projectItem = document.getElementsByClassName("projectItem");

    // boucle de 0 à 3 le tableau buttonFilter.
    for (let a = 0; a < buttonFilter.length; a++) {
      // Buttonfilter[a]= tableau qui contient les filtres de 0 à 3. Puis ajoute un évènemement d'écoute sur chaque click du filtre qui a pour argument "event"
      buttonFilter[a].addEventListener("click", (event) => {
        // event = intérieur du buttonFilter[a], avec event (variable) on récupère le dataset qui se trouve sur le bouton avec la route: target/dataset/id
        // création de la variable buttonfilterdatasetId qui contient le chemin pour récupérer l'ID du bouton filter
        const buttonfilterdatasetId = event.target.dataset.id;

        // transformation de l'objet en tableau. item = projectItem
        [...projectItem].forEach((item) => {
          // création de la variable dataCategory qui mène au chemin pour récupérer le dataset des images = data-figure
          const dataCategory = item.dataset.figure;
          // si buttonfilterdatasetId (les boutons filtres) correspond à datacategory (numéro de la catégorie de l'image) OU si buttonfilter (les boutons filtres) vaut 0
          if (
            buttonfilterdatasetId === dataCategory ||
            buttonfilterdatasetId == 0
          ) {
            // alors il affiche les images car il donne un affichage initial
            item.style.display = "initial";
          } else {
            // sinon il les cache
            item.style.display = "none";
          }
        });

        for (let b = 0; b < buttonFilter.length; b++) {
          // si parmi toutes les dataset id(0 1 2 3) y en a une qui correspond au bouton cliqué
          if (buttonFilter[b].dataset.id === event.target.dataset.id) {
            // alors tu ajoutes la classe active
            buttonFilter[b].classList.add("active");
          } else {
            // sinon tu enlèves la classe active si elle existe
            buttonFilter[b].classList.remove("active");
          }
        }
      });
    }
    // condition try et catch, try permet d'essayer le code appliqué et s'il n'y arrive pas, il affiche l'erreur dans un console log
  } catch (err) {
    console.error(err);
  }
  // création d'une variable "cookies" afin qu'il sépare les cookies dans un tableau avec split (";")
  const cookies = document.cookie.split("=");
  const login = document.getElementById("login");
  const changeBar = document.getElementById("change_bar");
  const filterGroup = document.getElementById("filterGroup");

  if (cookies[0] === "Login") {
    // alors change login en logout
    changeBar.style.display = "flex";
    login.innerText = "logout";
    filterGroup.style.visibility = "hidden";
    login.href = "#";
    login.addEventListener("click", (event) => {
      document.cookie =
        "Login=value; path=/FrontEnd; domain=127.0.0.1; Max-age=0";
      changeBar.style.display = "none";
      login.innerText = "login";
      location.reload();
      console.log(cookies);
    });
  }
  const editGallery = document.getElementById("editGallery");
  const modal = document.getElementById("modal");

  // Permet d'ouvrir la fênetre modale
  editGallery.addEventListener("click", (event) => {
    event.preventDefault();

    previousPage.style.display = 'none';
    modal.style.display = "flex";
    galleryPicture.style.display = "flex";
  });

  const closeModal = document.getElementById("closeModal");

  // Permet de fermer la fenêtre modale => "x"
  closeModal.addEventListener("click", (event) => {
    event.preventDefault();

    newPicture.style.display = "none";
    modal.style.display = "none";
  });

  const addPicture = document.getElementById("addPicture");
  const newPicture = document.getElementById("newPicture");
  const galleryPicture = document.getElementById("galleryPicture");
  const previousPage = document.getElementById("previousPage");

  // Permet d'afficher la deuxième fênetre de la modale quand on clique sur "Ajouter une photo"
  addPicture.addEventListener("click", (event) => {
    event.preventDefault();

    previousPage.style.display = "flex";
    newPicture.style.display = "flex";
    galleryPicture.style.display = "none";
  });

  previousPage.addEventListener("click", (event) => {
    event.preventDefault();

    previousPage.style.display = 'none';
    galleryPicture.style.display = "flex";
    newPicture.style.display = "none";
  });
}
getElementAPI();
