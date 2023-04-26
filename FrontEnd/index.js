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

      // Boucle les images de l'API dans la modale
      const pictureModal = document.getElementById("pictureModal");
      pictureModal.innerHTML += `<div class="pictureModal">
            <div class="imgModal">
              <img src=${imgUrl} alt=${titleimg}> 
              <div class="iconModal">
              <svg class="arrowDirectionnel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg>
              <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                </div>
            </div>
            <p>éditer</p>
        </div>`;
    });
    // suppression d'une image
    const deleteIcon = document.querySelectorAll(".deleteIcon");
    data.forEach((element, i) => {
      const pictureId = element.id;
      const deleteButton = deleteIcon[i];

      deleteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          fetch(`http://localhost:5678/api/works/${pictureId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${cookies[1]}`,
              Accept: "application/json",
            },
          }).then((responseDelete) => {
            if (!responseDelete.ok) {
              throw new Error("Network response was not ok");
            } else {
              console.log("Image deleted successfully.");
            }
          });
        } catch (error) {
          console.error(error);
        }
      });
    });
    const buttonFilter = document.querySelectorAll(".filterButton");
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
      });
    }
    // Créer les options de catégories du menu déroulant de la modale
    const optionCategory = document.getElementById("optionCategory");

    optionCategory.innerHTML = `<option value=""></option>
    <option value="1">Objets</option>
    <option value="2">Appartements</option>
    <option value="3">Hôtels & restaurants</option>`;

    // condition try et catch, try permet d'essayer le code appliqué et s'il n'y arrive pas, il affiche l'erreur dans un console log
  } catch (err) {
    console.error(err);
  }
  // création d'une variable "cookies" afin qu'il sépare les cookies dans un tableau avec split (";")
  const cookies = document.cookie.split("=");
  const login = document.getElementById("login");
  const changeBar = document.getElementById("change_bar");
  const filterGroup = document.getElementById("filterGroup");
  const editButton = document.querySelectorAll('.editButton');
  
  if (cookies[0] === "Login") {
    // alors change login en logout
    changeBar.style.display = "flex";
    login.innerText = "logout";
    filterGroup.style.visibility = "hidden";
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].style.visibility = "visible";
    }
    login.href = "#";
    login.addEventListener("click", (event) => {
      document.cookie =
        "Login=value; path=/FrontEnd; domain=127.0.0.1; Max-age=0";
      changeBar.style.display = "none";
      login.innerText = "login";
      location.reload();
    });
  }

  const modal = document.getElementById("modal");

  // Permet d'ouvrir la fênetre modale
  editGallery.addEventListener("click", (event) => {
    event.preventDefault();

    previousPage.style.visibility = "hidden";
    modal.style.display = "flex";
    galleryPicture.style.display = "flex";
    newPicture.style.display = "none";

    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
      event.stopPropagation();
    });
  });

  const closeModal = document.getElementById("closeModal");

  // Permet de fermer la fenêtre modale => "x"
  closeModal.addEventListener("click", (event) => {
    event.preventDefault();

    modal.style.display = "none";
  });

  const addPicture = document.getElementById("addPicture");
  const newPicture = document.getElementById("newPicture");
  const galleryPicture = document.getElementById("galleryPicture");
  const previousPage = document.getElementById("previousPage");

  // Permet d'afficher la deuxième fênetre de la modale quand on clique sur "Ajouter une photo"
  addPicture.addEventListener("click", (event) => {
    event.preventDefault();

    previousPage.style.visibility = "visible";
    newPicture.style.display = "flex";
    galleryPicture.style.display = "none";
  });

  previousPage.addEventListener("click", (event) => {
    event.preventDefault();

    previousPage.style.visibility = "hidden";
    galleryPicture.style.display = "flex";
    newPicture.style.display = "none";
  });

  const dropZone = document.getElementById("addNewPic");
  const basicAppareance = document.getElementById("basicAppareance");
  const pictureDisplayed = document.getElementById("pictureDisplayed");

  // Écouteur d'événement pour empêcher le comportement par défaut lors du dragover
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  // C'est l'effet de rentrer dans la zone
  dropZone.addEventListener("dragenter", (e) => {
    e.preventDefault();
    basicAppareance.style.display = "none";
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    basicAppareance.style.display = "flex";
  });

  const imageDrop = document.getElementById("pictureDisplayed").children[0];
  let resultData = {};
  let imgExist = false;
  // Écouteur d'événement pour récupérer l'image lors du drop
  dropZone.addEventListener("drop", function (e) {
    e.preventDefault();

    // Récupérer l'image déposée
    const image = e.dataTransfer.files[0];
    const fileExt = image?.name.split(".").pop();

    if (
      image &&
      ["jpg", "jpeg", "png", "gif", "bmp"].indexOf(fileExt.toLowerCase()) !== -1
    ) {
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        // Mettre à jour l'attribut src de l'image avec l'URL de l'image déposée
        imageDrop.src = event.target.result;
      };

      fileReader.readAsDataURL(image);
      resultData = image;
      imgExist = true;
    }
    if (imgExist) {
      basicAppareance.style.display = "none";
    } else {
      basicAppareance.style.display = "flex";
    }
  });

  const fileUpload = document.getElementById("file-upload");

  fileUpload.addEventListener("change", (e) => {
    const image = e.target.files[0];

    if (image.type.match("image.*")) {
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        // Mettre à jour l'attribut src de l'image avec l'URL de l'image déposée
        imageDrop.src = event.target.result;
      };

      fileReader.readAsDataURL(image);
      resultData = image;
      imgExist = true;
    }
    if (imgExist) {
      basicAppareance.style.display = "none";
    } else {
      basicAppareance.style.display = "flex";
    }
  });
  const validateImgButton = document.getElementById("validateImgButton");

  validateImgButton.addEventListener("click", (e) => {
    e.preventDefault();
    let titlePicture = document.formAddPicture.text.value;
    let categoryPicture = document.formAddPicture.menu.value;
    if (resultData && titlePicture && categoryPicture) {
      const formData = new FormData();
      formData.append("image", resultData);
      formData.append("title", titlePicture);
      formData.append("category", categoryPicture);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies[1]}`,
          Accept: "application/json",
        },
        body: formData,
      }).then((response) => response.json());
    } else {
      document.getElementById("errorMessageModal").innerHTML =
        "Veuillez ajouter une image et remplir les champs au dessus";
    }
  });
}
getElementAPI();
