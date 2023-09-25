const inputCP = document.getElementById("inputCP")
const boutonVille = document.getElementById("boutonVille")
const inputVille = document.getElementById("inputVille")
const ville = document.getElementsByClassName("ville")
const resultat = document.getElementById("resultat")
const formulaire = document.getElementById("formulaire")

const min = document.getElementById("min")
const max = document.getElementById("max")
const pluie = document.getElementById("pluie")
const soleil = document.getElementById("soleil")

let codePostal;

inputCP.addEventListener("input", () => listenerCP())
boutonVille.addEventListener("click", () => valider())


function listenerCP() {
    codePostal = inputCP.value

    for (var i = 0; i < ville.length; i++) { ville[i].style.display = "none" }
    resultat.style.display="none"

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('response not ok');
            }
            return Response.json();
        })
        .then(data => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    inputVille.innerHTML += `<option value="${data[i]['nom']}">${data[i]['nom']}</option>`
                }
                for (var i = 0; i < ville.length; i++) { ville[i].style.display = "block" }
            }
        })
        .catch(error => {
            console.error('problem', error)
        })
}


function valider() {
    resultat.style.display='block'
    formulaire.style.display='none'
    fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=4bba169b3e3365061d39563419ab23e5016c0f838ba282498439c41a00ef1091&insee=${inputVille.value}`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('response not ok');
            }
            return Response.json();
        })
    .then(data => {
        if (data > 0) {
            for (let i = 0; i < data.length; i++) {
                inputVille.innerHTML += `<option value="${data[i]['nom']}">${data[i]['nom']}</option>`
            }
            for (var i = 0; i < ville.length; i++) { ville[i].style.display = "block" }
        }
    })
    .catch(error => {
        console.error('problem', error)
    })
}


