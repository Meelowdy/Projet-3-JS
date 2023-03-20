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
console.log(result.token);

document.cookie=`Login=${access_token=result.token}`

window.location.href='http://127.0.0.1:5501/FrontEnd/'
});
