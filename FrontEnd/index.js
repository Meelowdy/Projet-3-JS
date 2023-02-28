function getElementAPI() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                let imgUrl = element.imageUrl;
                let titleimg = element.title;
                document.getElementById("imgProjet").innerHTML +=
                    `<figure>
            <img src=${imgUrl} alt=${titleimg}>
            <figcaption>${titleimg}</figcaption>
            </figure>`


            });
            const buttonFilter = document.querySelectorAll('button');
            for (let a = 0; a < buttonFilter.length; a++) {
                buttonFilter[a].addEventListener('click', event => {
                    console.log(event.target.dataset.id)
                })
            };
        })

};
getElementAPI()
