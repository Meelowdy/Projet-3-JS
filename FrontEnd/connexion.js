const connexionButton = document.getElementById("connexionButton");
connexionButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let formData = {
    "email": document.formLogin.email.value,
    "password": document.formLogin.password.value
  };

  let response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(formData)
  })
let result = await response.json();

const emailError = document.getElementById("email_error");
const passwordError = document.getElementById("password_error");
switch (response.status) {
  case 200:
    window.location.href='http://127.0.0.1:5501/FrontEnd/'
    break;
    case 404:
    emailError.style.display = "initial";
    console.log(result)
  case 401:
    passwordError.style.display = "initial"
    console.log(result)
    break;  
  default:
    console.log("Contactez la personne");
    break;
}

document.cookie=`Login=${access_token=result.token}`
});
