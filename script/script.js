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
    weatherCardsContainer.innerHTML=""
    fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${inputVille.value}&world=false&start=0&end=${nbjour.value - 1}&token=d9588107c8c240cee278bdf86180ba6140aad80ba16953aded2d70d4b5b287ad`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
        .then(data => {
            for (let i = 0; i < nbjour.value; i++) {
                let mine = data['forecast'][i]['tmin']
                let maxe = data['forecast'][i]['tmax']
                let soleile = data['forecast'][i]['sun_hours']
                let pluiee = data['forecast'][i]['probarain']
                let latitudee = data['forecast'][i]['latitude']
                let longitudee = data['forecast'][i]['longitude']
                let precipitatione = data['forecast'][i]['rr10']
                let ventee = data['forecast'][i]['wind10m']
                let dirVentee = data['forecast'][i]['dirwind10m']
                dataWeather = { 'imagePath': "../images/meteo.png", 'card_tempMin': mine, 'card_tempMax': maxe, 'card_rainProb': pluiee, 'card_sunlight': soleile, 'card_latitude': latitudee, 'card_longitude': longitudee, 'card_precipitation': precipitatione, 'card_wind': ventee, 'card_windDirection': dirVentee }
 
                const weatherCard = new WeatherCard();
                weatherCard.appendTo(weatherCardsContainer);
                weatherCard.updateData(dataWeather);

                weatherCard.toggleFeature('card_latitude', check_latitude.checked)
                weatherCard.toggleFeature('card_longitude', check_longitude.checked)
                weatherCard.toggleFeature('card_precipitation', check_precipitation.checked)
                weatherCard.toggleFeature('card_wind', check_vent.checked)
                weatherCard.toggleFeature('card_windDirection', check_dirVent.checked)
            }
        })
        .catch(error => {
            console.error('error', error)
        })
}

function validerParam() {
    valider();
}


