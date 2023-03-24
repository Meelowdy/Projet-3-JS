const connexionButton = document.getElementById("connexionButton");
// la fonction que je crée avec l'évent d'écoute est asynchrone, ce qui permet d'effectuer plusieurs action/requête en même temps car de base chaque code, il l'éxécute de haut en bas 
connexionButton.addEventListener("click", async (event) => {
// preventDefault doit être obligatoirement mis en présence d'un submit form ou d'un addeventlistener. Sans ça, la page va faire que recharger.
  event.preventDefault();

  let formData = {
    "email": document.formLogin.email.value,
    "password": document.formLogin.password.value
  };
// response contient les données qu'on veut donner en échange d'une information que contient l'API
  let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(formData)
  })
  // result contient l'information demandé par response 
let result = await response.json();

const emailError = document.getElementById("email_error");
const passwordError = document.getElementById("password_error");
// switch contient la valeur à comparer () et case contient la condition
switch (response.status) {
  case 200:
    //renvoie vers la page ciblée 
    window.location.href='http://127.0.0.1:5501/FrontEnd/'
    // ça stock le token dans un cookie
    document.cookie=`Login=${access_token=result.token}`
    break;
    case 404:
    emailError.style.display = "flex";
    break;
  case 401:
    passwordError.style.display = "flex"
    break;  
}
});
