/**
 * Classe weather card
 * permet de gerer les cartes avec des methodes
 */
class WeatherCard {
    //constructeur qui fait le html
    constructor() {
        this.cardElement = this._createCardElement();
    }

    /**
     * methode appelée dans le constructeur qui crée la carte
     */
    _createCardElement() {
        const cardHTML = `
        <div class="weather-card">
            <p class="card_date" id="date"><span>0</span></p>
            <img src="path_to_default_weather_image.jpg" alt="Météo actuel" class="weather-image" id="weatherImage">
            <hr>
            <div class="weather-details">
                <div class="subgrid">
                    <div class="grid-item">
                        <img src="../images/tmpmin.png" alt="Température minimale" class="icon">
                        <p class="card_tempMin" id="tempMin"><span>0</span>°C</p>
                    </div>
                    <div class="grid-item">
                        <img src="../images/tmpmax.png" alt="Température maximale" class="icon">
                        <p class="card_tempMax" id="tempMax"><span>0</span>°C</p>
                    </div>
                    <div class="grid-item">
                        <img src="../images/pluie.png" alt="Probabilité de pluie" class="icon">
                        <p class="card_rainProb" id="rainProb"><span>0</span>%</p>
                    </div>
                    <div class="grid-item">
                        <img src="../images/soleil.png" alt="Ensoleillement journalier" class="icon">
                        <p class="card_sunlight" id="sunlight"><span>0</span>h</p>
                    </div>
                </div>
                <hr>
                <p class="card_latitude" id="latitude">Latitude: <span>0</span>°</p>
                <p class="card_longitude" id="longitude">Longitude: <span>0</span>°</p>
                <p class="card_precipitation" id="precipitation">Précipitation: <span>0</span>mm</p>
                <p class="card_wind" id="wind">Vent: <span>0</span>km/h</p>
                <p class="card_windDirection" id="windDirection">Direction du vent: <span>0</span>°</p>
            </div>
        </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = cardHTML.trim();
        return div.firstChild;
    }

    /**
     * sert a ajouter la carte au weather card conteneur
     */
    appendTo(parent) {
        parent.appendChild(this.cardElement);
    }

    /**
     * met a jour les donnes de la carte recu par le dictionnaire un paramettres 
     * @param {*} data 
     */
    updateData(data) {
        if (data.imagePath) {
            this.cardElement.querySelector('#weatherImage').src = data.imagePath
            this.cardElement.querySelector('#weatherImage').alt = (data.imagePath.split("/")[2]).split(".")[0];
        };
        if (data.card_tempMin) this._updateFeature('card_tempMin', data.card_tempMin);
        if (data.card_tempMax) this._updateFeature('card_tempMax', data.card_tempMax);
        if (data.card_rainProb) this._updateFeature('card_rainProb', data.card_rainProb);
        if (data.card_sunlight) this._updateFeature('card_sunlight', data.card_sunlight);
        if (data.card_latitude) this._updateFeature('card_latitude', data.card_latitude);
        if (data.card_longitude) this._updateFeature('card_longitude', data.card_longitude);
        if (data.card_precipitation) this._updateFeature('card_precipitation', data.card_precipitation);
        if (data.card_wind) this._updateFeature('card_wind', data.card_wind);
        if (data.card_windDirection) this._updateFeature('card_windDirection', data.card_windDirection);
        if (data.card_date) this._updateFeature('card_date', data.card_date);
    }

    /**
     * permet de choisir si on affiche ou non un atribut de la carte
     * @param {*} featureClass 
     * @param {*} shouldShow 
     */
    toggleFeature(featureClass, shouldShow) {
        const featureElement = this.cardElement.querySelector(`.${featureClass}`);
        if (featureElement) {
            featureElement.style.display = shouldShow ? 'block' : 'none';
        }
    }


    /**
     * modifie l'attribut par la nouvelle valeur
     * @param {*} featureClass 
     * @param {*} value 
     */
    _updateFeature(featureClass, value) {
        const featureElement = this.cardElement.querySelector(`.${featureClass} span`);
        if (featureElement) {
            featureElement.innerText = value;
        }
    }

}




