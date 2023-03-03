async function getElementAPI() {
    try {
        let response = await fetch("http://localhost:5678/api/works")
        let data = await response.json();
        data.forEach(element => {
            let imgUrl = element.imageUrl;
            let titleimg = element.title;
            document.getElementById("imgProjet").innerHTML +=
            `<figure class="projectItem" data-figure=${element.categoryId}>
                <img src=${imgUrl} alt=${titleimg}>
                <figcaption>${titleimg}</figcaption>
            </figure>` 
        });           
            const buttonFilter = document.querySelectorAll('button');
            const projectItem = document.getElementsByClassName("projectItem");
         
            for (let a = 0; a < buttonFilter.length; a++) {
     
                buttonFilter[a].addEventListener('click', event => {
            
                    const buttonfilterdatasetId = event.target.dataset.id;
                   
                    [...projectItem].forEach(item =>{    
                    const dataCategory = item.dataset.figure;
                       
                        if (buttonfilterdatasetId === dataCategory || buttonfilterdatasetId==0) {
                            item.style.display = "initial";
                        }
                        else {
                            item.style.display = "none";
                        }
                    })
                 
                })
            }
    
    } catch (err) {
        console.error(err);        
    }
};
getElementAPI()
