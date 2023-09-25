const inputCP = document.getElementById("inputCP")
const boutonVille = document.getElementById("boutonVille")
const inputVille = document.getElementById("inputVille")
const ville = document.getElementsByClassName("ville")
const selectVille = document.getElementById("selectVille")

let codePostal;

inputCP.addEventListener("input", () => listenerCP())
boutonVille.addEventListener("click", () => valider())

function listenerCP(){
    codePostal = inputCP.value
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
    .then(Response => {
    if(!Response.ok){
        throw new Error('response not ok');
    }
    return Response.json();
    })
        .then(data => {
    for(let i = 0; i < data.length; i++){
        selectVille.innerHTML += `<option value="${data[i]['nom']}">${data[i]['nom']}</option>`
    }
    for (var i = 0; i < ville.length; i++) { ville[i].style.display = "block" }
})
.catch(error => {
    console.error('problem', error)
})
    
}
function valider(){
    console.log("valider")
}


