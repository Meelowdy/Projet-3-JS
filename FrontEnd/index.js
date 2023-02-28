function getElementAPI() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(response => {
        for (let i = 0; i <= response.length; i++) {
            let imgUrl = response[i].imageUrl;
            let titleimg = response[i].title;
            document.getElementById("imgProjet").innerHTML +=
            `<figure>
            <img src=${imgUrl} alt=${titleimg}>
            <figcaption>${titleimg}</figcaption>
            </figure>`
        }
    })

};
getElementAPI()
