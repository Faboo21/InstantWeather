class WeatherCard {
    constructor() {
        this.cardElement = this._createCardElement();
    }

    _createCardElement() {
        const cardHTML = `
            <div class="weather-card">
                <img src="path_to_default_weather_image.jpg" alt="Weather Image" class="weather-image" id="weatherImage">
                <div class="weather-details">
                    <p class="card_tempMin" id="tempMin">Température minimale: <span>0</span>°C</p>
                    <p class="card_tempMax" id="tempMax">Température maximale: <span>0</span>°C</p>
                    <p class="card_rainProb" id="rainProb">Probabilité de pluie: <span>0</span>%</p>
                    <p class="card_sunlight" id="sunlight">Ensoleillement journalier: <span>0</span>heures</p>
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

    appendTo(parent) {
        parent.appendChild(this.cardElement);
    }

    updateData(data) {
        if (data.imagePath) this.cardElement.querySelector('#weatherImage').src = data.imagePath;
        if (data.card_tempMin) this._updateFeature('card_tempMin', data.card_tempMin);
        if (data.card_tempMax) this._updateFeature('card_tempMax', data.card_tempMax);
        if (data.card_rainProb) this._updateFeature('card_rainProb', data.card_rainProb);
        if (data.card_sunlight) this._updateFeature('card_sunlight', data.card_sunlight);
        if (data.card_latitude) this._updateFeature('card_latitude', data.card_latitude);
        if (data.card_longitude) this._updateFeature('card_longitude', data.card_longitude);
        if (data.card_precipitation) this._updateFeature('card_precipitation', data.card_precipitation);
        if (data.card_wind) this._updateFeature('card_wind', data.card_wind);
        if (data.card_windDirection) this._updateFeature('card_windDirection', data.card_windDirection);
    }

    toggleFeature(featureClass, shouldShow) {
        const featureElement = this.cardElement.querySelector(`.${featureClass}`);
        if (featureElement) {
            featureElement.style.display = shouldShow ? 'block' : 'none';
        }
    }
    

    _updateFeature(featureClass, value) {
        const featureElement = this.cardElement.querySelector(`.${featureClass} span`);
        if (featureElement) {
            featureElement.innerText = value;
        }
    }
    
}




