/**
 * definition des constrantes du DOM
 */

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

/**
 * definition des variables utiles
 */
let codePostal;
let dataWeather;

/**
 * ajout des listeners sur nos boutons et inputs
 */
inputCP.addEventListener("input", () => listenerCP())
boutonVille.addEventListener("click", () => valider())
refresh.addEventListener("click", () => { location.reload() })
validerParame.addEventListener("click", () => valider())

/**
 * sert a afficher le nombre de jours de la range
 */
value.textContent = nbjour.value;
nbjour.addEventListener("input", (event) => {
    value.textContent = event.target.value
})


/**
 * fonction qui se lance a chaque modification du input CP
 * elle fait un regex sur l'input pour avoir un max de 5 chiffres et ne mettre que des chiffres
 * recherche les villes associées au code postal et les met dans le select
 */
function listenerCP() {
    //regex
    let newValue = inputCP.value.replace(/[^0-9]/g, '');
    if (newValue.length > 5) {
        newValue = newValue.substring(0, 5);
    }
    inputCP.value = newValue;
    codePostal = inputCP.value

    //cache la suite du formulaire
    for (var i = 0; i < ville.length; i++) { ville[i].style.display = "none" }
    resultat.style.display = "none"

    // fait une requete a l'api
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
        .then(Response => {
            //si pas de reponse rien
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
        .then(data => {
            // recuperation des villes et les insere dans le select
            if (data.length > 0) {
                inputVille.innerHTML = ""
                for (let i = 0; i < data.length; i++) {
                    inputVille.innerHTML += `<option value="${data[i]['code']}">${data[i]['nom']}</option>`
                }
                // affiche la suite du formulaire
                for (var i = 0; i < ville.length; i++) { ville[i].style.display = "block" }
            }
        })
        .catch(error => {
            console.error('error', error)
        })
}

/**
 * fonction qui ce lance quand l'utilisateur valide ou change les paramettres
 * elle recupere les paramettres et requete l'api meteo puis affiche les weather card remplies
 */
function valider() {
    // affiche le resulat
    resultat.style.display = 'block'
    //cache le formulaire
    formulaire.style.display = 'none'
    weatherCardsContainer.innerHTML = ""

    //fait la requete a l'api meteo
    fetch(`https://api.meteo-concept.com/api/forecast/daily?insee=${inputVille.value}&world=false&start=0&end=${nbjour.value - 1}&token=d9588107c8c240cee278bdf86180ba6140aad80ba16953aded2d70d4b5b287ad`)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('pas de reponse');
            }
            return Response.json();
        })
        .then(data => {
            // affiche le nom de la ville choisie
            nomVille.innerText = "Prévisions pour la ville de " + data['city']['name']

            //pour chaque jour recupere les données de l'api
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
                let date = splitDate(data['forecast'][i]['datetime'])

                // insere les données dans un dictionaire
                dataWeather = { 'imagePath': "../" + imagePath, 'card_tempMin': mine, 'card_tempMax': maxe, 'card_rainProb': pluiee, 'card_sunlight': soleile, 'card_latitude': latitudee, 'card_longitude': longitudee, 'card_precipitation': precipitatione, 'card_wind': ventee, 'card_windDirection': dirVentee, 'card_date': date }

                // crée une card
                const weatherCard = new WeatherCard();
                // l'ajoute au html
                weatherCard.appendTo(weatherCardsContainer);
                //remplis les données dans la carte
                weatherCard.updateData(dataWeather);

                //affiche ou non les option dans la weather card en fonction des paramettres
                weatherCard.toggleFeature('card_latitude', check_latitude.checked)
                weatherCard.toggleFeature('card_longitude', check_longitude.checked)
                weatherCard.toggleFeature('card_precipitation', check_precipitation.checked)
                weatherCard.toggleFeature('card_wind', check_vent.checked)
                weatherCard.toggleFeature('card_windDirection', check_dirVent.checked)

                
                
            }
            //lance l'animation d'affichage de la carte
            animateCards()
        })
        .catch(error => {
            console.error('error', error)
        })
}

//fonction qui met la date au format ecriture pour l'affichage dans la carte
function splitDate(date) {
    let maDate1 = date.split("T");
    let maDate2 = maDate1[0].split("-");
    let mois = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
    let jourSemaine = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];
    let jour1 = new Date(date);
    let jour2 = jour1.getDay();
    return `${jourSemaine[jour2]} ${maDate2[2]} ${mois[maDate2[1] - 1]}`;
}

//fonction qui anime l'arrivée des cartes 
function animateCards() {
    const cards = document.querySelectorAll('.weather-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateX(0)';
            card.addEventListener('transitionend', function () {
                card.classList.add('zoomOnHover');  // Ajoute la classe après la transition
            }, { once: true });  // L'événement sera écouté une seule fois pour chaque carte
        }, 200 * index);
    });
}

//variable contenant tout les code meteo avec leur equivalent en image pour l'affichage dans la weather card
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