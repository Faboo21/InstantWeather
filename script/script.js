const inputCP = document.getElementById("inputCP")
const boutonVille = document.getElementById("boutonVille")
const inputVille = document.getElementById("inputVille")
const ville = document.getElementsByClassName("ville")
const resultat = document.getElementById("resultat")
const formulaire = document.getElementById("formulaire")
const refresh = document.getElementById('refresh')

const min = document.getElementById("min")
const max = document.getElementById("max")
const pluie = document.getElementById("pluie")
const soleil = document.getElementById("soleil")

let codePostal;

inputCP.addEventListener("input", () => listenerCP())
boutonVille.addEventListener("click", () => valider())
refresh.addEventListener("click",() => {location.reload()})

function listenerCP() {
    codePostal = inputCP.value

    for (var i = 0; i < ville.length; i++) { ville[i].style.display = "none" }
    resultat.style.display="none"

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
        .then(data => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    inputVille.innerHTML += `<option value="${data[i]['code']}">${data[i]['nom']}</option>`
                }
                for (var i = 0; i < ville.length; i++) { ville[i].style.display = "block" }
            }
        })
        .catch(error => {
            console.error('error', error)
        })
}


function valider() {
    resultat.style.display='block'
    formulaire.style.display='none'
    fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${inputVille.value}&world=false&start=0&end=0&token=d9588107c8c240cee278bdf86180ba6140aad80ba16953aded2d70d4b5b287ad`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
    .then(data => {
        min.innerText=`temperture minimal : ${data['forecast'][0]['tmin']}°C`
        max.innerText=`temperture maximal : ${data['forecast'][0]['tmax']}°C`
        soleil.innerText=`Ensoleillement journalier : ${data['forecast'][0]['sun_hours']} heures`
        pluie.innerText=`Probabilité de pluie : ${data['forecast'][0]['probarain']}%`
    })
    .catch(error => {
        console.error('error', error)
    })
}


