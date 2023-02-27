// créer un évènement pour charger/recharger/actualiser une page qui lance une fonction = (=>)
function getElementAPI (event) {
    // la fonction "fetch" va récupérer l'URL demandé
    fetch("http://localhost:5678/api/works")
    // la ligne 5 on l'écrit toujours quand c'est un .json à l'intérieur du Fetch
        .then(response => response.json()) // .json contient des objets et chaques objets contiennent des variables
        .then(response => { // response contient tout le contenu de la route api/works
            // pour i = 0 tant que i est inférieur ou égal à la longueur du tableau, il incrémente
            for (let i = 0; i <= response.length; i++) {
                // création d'une variable imgUrl qui contient un tableau qui boucle l'url de l'image de 0 à 11 
                let imgUrl = response[i].imageUrl;
                // idem pour les titres
                let titleimg = response[i].title;
                // document correspond à la page html. Obtenir l'élément id ImgProjet. Pour l'afficher dans l'HTML, utilisation de innerHTML
                document.getElementById("imgProjet").innerHTML += // += fais une concaténation de ce qu'il y a à l'intérieur d'innerHTML (img + fig en boucle)
                `<figure>
				    <img src=${imgUrl} alt=${titleimg}>
				    <figcaption>${titleimg}</figcaption>
			    </figure>`
            }
        })
};
getElementAPI()

