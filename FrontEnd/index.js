async function getElementAPI() {
    try {
        let response = await fetch("http://localhost:5678/api/works")
        let data = await response.json();
        data.forEach(element => {
            let imgUrl = element.imageUrl;
            let titleimg = element.title;
            document.getElementById("imgProjet").innerHTML +=
            `<figure class="projectItem">
                <img src=${imgUrl} alt=${titleimg}>
                <figcaption>${titleimg}</figcaption>
            </figure>` 
           
            const buttonFilter = document.querySelectorAll('button');
          
            for (let a = 0; a < buttonFilter.length; a++) {
                // boucle de 0 à 3 les tableaux du buttonFilter. Ajout d'un évènemement d'écoute click qui a pour argument "event"  
                buttonFilter[a].addEventListener('click', event => {
                    // event = intérieur du buttonFilter[a], avec event (variable) on récupère le dataset qui se trouve dans le target/dataset/id
                    // console.log(document.getElementsByClassName("projectItem"));
                    const projectItem = document.getElementsByClassName("projectItem");
                    // for (let b = 0; b < projectItem.length; b++) {
                    // }         
                    // console.log("api category id = " + element.categoryId);
                    // console.log("id dataset du bouton" + buttonFilter[a].dataset.id);
                    if (buttonFilter[a].dataset.id != element.categoryId) {
                        // projectItem[a].style.display = "none";
                        console.log("IF = " + projectItem[a])
                    }
                    else {
                        console.log("ELSE = " + projectItem[a])
                        // console.log(projectItem[5].style.backgroundColor = "red")
                        // console.log(projectItem[0].classList)
                    }
                })
            }
        });
    
    } catch (err) {
        console.error(err);        
    }
};
getElementAPI()
