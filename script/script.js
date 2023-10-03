const inputCP = document.getElementById("inputCP")
const boutonVille = document.getElementById("boutonVille")
const inputVille = document.getElementById("inputVille")
const ville = document.getElementsByClassName("ville")
const resultat = document.getElementById("resultat")
const formulaire = document.getElementById("formulaire")
const refresh = document.getElementById('refresh')
const value = document.getElementById("value");
const nbjour = document.getElementById("nbjour");

const min = document.getElementById("min")
const max = document.getElementById("max")
const pluie = document.getElementById("pluie")
const soleil = document.getElementById("soleil")
const validerParame = document.getElementById("validerParame")
const weatherCardsContainer = document.getElementById('weatherCardsContainer');


const latitude = document.getElementById("latitude")
const longitude = document.getElementById("longitude")
const precipitation = document.getElementById("precipitation")
const vent = document.getElementById("vent")
const dirVent = document.getElementById("dirVent")
const check_latitude = document.getElementById("lat");
const check_longitude = document.getElementById("lon");
const check_precipitation = document.getElementById("pre");
const check_vent = document.getElementById("vente");
const check_dirVent = document.getElementById("dirVente");

let codePostal;
let numberOfDays = 3;
let dataWeather;


listenerCP()
inputCP.addEventListener("input", () => listenerCP())
boutonVille.addEventListener("click", () => valider())
refresh.addEventListener("click", () => { location.reload() })
validerParame.addEventListener("click", () => validerParam())

value.textContent = nbjour.value;
nbjour.addEventListener("input", (event) => {
    value.textContent = event.target.value
})

function listenerCP() {
    codePostal = inputCP.value

    for (var i = 0; i < ville.length; i++) { ville[i].style.display = "none" }
    resultat.style.display = "none"

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
        .then(data => {
            if (data.length > 0) {
                inputVille.innerHTML = ""
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
    resultat.style.display = 'block'
    formulaire.style.display = 'none'
    fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${inputVille.value}&world=false&start=0&end=0&token=d9588107c8c240cee278bdf86180ba6140aad80ba16953aded2d70d4b5b287ad`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
        .then(data => {
            min.innerText = `temperture minimal : ${data['forecast'][0]['tmin']}°C`
            max.innerText = `temperture maximal : ${data['forecast'][0]['tmax']}°C`
            soleil.innerText = `Ensoleillement journalier : ${data['forecast'][0]['sun_hours']} heures`
            pluie.innerText = `Probabilité de pluie : ${data['forecast'][0]['probarain']}%`
            latitude.innerText = `latitude : ${data['forecast'][0]['latitude']}°`
            longitude.innerText = `longitude : ${data['forecast'][0]['longitude']}°`
            precipitation.innerText = `precipitation : ${data['forecast'][0]['rr10']}mm`
            vent.innerText = `vent : ${data['forecast'][0]['wind10m']}km/h`
            dirVent.innerText = `dirction du vent : ${data['forecast'][0]['dirwind10m']}°`

            latitude.style.display = 'none'
            longitude.style.display = 'none'
            precipitation.style.display = 'none'
            vent.style.display = 'none'
            dirVent.style.display = 'none'

            dataWeather = {imagePath: "../images/meteo.png",tempMin: "15°C",tempMax: "21°C"}
            for (let i = 0; i < numberOfDays; i++) {
                const weatherCard = new WeatherCard();
                weatherCard.appendTo(weatherCardsContainer);
                weatherCard.updateData(dataWeather);
            }
        })
        .catch(error => {
            console.error('error', error)
        })
}

function validerParam() {
    if (check_latitude.checked) {
        latitude.style.display = 'block'
    } else {
        latitude.style.display = 'none'
    }

    if (check_longitude.checked) {
        longitude.style.display = 'block'
    } else {
        longitude.style.display = 'none'
    }

    if (check_precipitation.checked) {
        precipitation.style.display = 'block'
    } else {
        precipitation.style.display = 'none'
    }

    if (check_vent.checked) {
        vent.style.display = 'block'
        console.log('ta gueule maman');
    } else {
        vent.style.display = 'none'
    }

    if (check_dirVent.checked) {
        dirVent.style.display = 'block'
    } else {
        dirVent.style.display = 'none'
    }

}


