const inputCP = document.getElementById("inputCP")
const boutonVille = document.getElementById("boutonVille")
const inputVille = document.getElementById("inputVille")
const ville = document.getElementsByClassName("ville")
const resultat = document.getElementById("resultat")
const formulaire = document.getElementById("formulaire")
const refresh = document.getElementById('refresh')
const value = document.getElementById("value");
const nbjour = document.getElementById("nbjour");
const nomVille = document.getElementById("nomVille");

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

    let newValue = inputCP.value.replace(/[^0-9]/g, '');
    
    if (newValue.length > 5) {
        newValue = newValue.substring(0, 5);
    }

    inputCP.value = newValue;
    
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
            nomVille.innerText = "Prévisions pour la ville de "+data['city']['name']
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
                let imagePath = weatherCodeToImage[data['forecast'][i]['weather']];
                dataWeather = { 'imagePath': "../"+imagePath, 'card_tempMin': mine, 'card_tempMax': maxe, 'card_rainProb': pluiee, 'card_sunlight': soleile, 'card_latitude': latitudee, 'card_longitude': longitudee, 'card_precipitation': precipitatione, 'card_wind': ventee, 'card_windDirection': dirVentee }
 
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

let weatherCodeToImage = {
    0: "images/soleil.png",
    1: "images/soleil_nuage.png",
    2: "images/soleil_nuage.png",
    3: "images/nuage.png",
    4: "images/nuage.png",
    5: "images/nuage.png",
    6: "images/brouillard.png",
    7: "images/brouillard.png",
    10: "images/pluie.png",
    11: "images/pluie.png",
    12: "images/pluie.png",
    13: "images/pluie.png",
    14: "images/pluie.png",
    15: "images/pluie.png",
    16: "images/pluie.png",
    20: "images/neige.png",
    21: "images/neige.png",
    22: "images/neige.png",
    30: "images/pluie.png",
    31: "images/pluie.png",
    32: "images/pluie.png",
    40: "images/pluie.png",
    41: "images/pluie.png",
    42: "images/pluie.png",
    43: "images/pluie.png",
    44: "images/pluie.png",
    45: "images/pluie.png",
    46: "images/pluie.png",
    47: "images/pluie.png",
    48: "images/pluie.png",
    60: "images/neige.png",
    61: "images/neige.png",
    62: "images/neige.png",
    63: "images/neige.png",
    64: "images/neige.png",
    65: "images/neige.png",
    66: "images/neige.png",
    67: "images/neige.png",
    68: "images/neige.png",
    70: "images/pluie.png",
    71: "images/pluie.png",
    72: "images/pluie.png",
    73: "images/pluie.png",
    74: "images/pluie.png",
    75: "images/pluie.png",
    76: "images/pluie.png",
    77: "images/pluie.png",
    78: "images/pluie.png",
    100: "images/orage.png",
    101: "images/orage.png",
    102: "images/orage.png",
    103: "images/orage.png",
    104: "images/orage.png",
    105: "images/orage.png",
    106: "images/orage.png",
    107: "images/orage.png",
    108: "images/orage.png",
    120: "images/orage.png",
    121: "images/orage.png",
    122: "images/orage.png",
    123: "images/orage.png",
    124: "images/orage.png",
    125: "images/orage.png",
    126: "images/orage.png",
    127: "images/orage.png",
    128: "images/orage.png",
    130: "images/orage.png",
    131: "images/orage.png",
    132: "images/orage.png",
    133: "images/orage.png",
    134: "images/orage.png",
    135: "images/orage.png",
    136: "images/orage.png",
    137: "images/orage.png",
    138: "images/orage.png",
    140: "images/pluie.png",
    141: "images/pluie.png",
    142: "images/pluie.png",
    210: "images/pluie.png",
    211: "images/pluie.png",
    212: "images/pluie.png",
    220: "images/neige.png",
    221: "images/neige.png",
    222: "images/neige.png",
    230: "images/pluie.png",
    231: "images/pluie.png",
    232: "images/pluie.png",
    235: "images/orage.png"
};



