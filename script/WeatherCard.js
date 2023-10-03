class WeatherCard {
    constructor() {
        this.cardElement = this._createCardElement();
    }

    _createCardElement() {
        const cardHTML = `
            <div class="weather-card">
                <img src="path_to_default_weather_image.jpg" alt="Weather Image" class="weather-image" id="weatherImage">
                <div class="weather-details">
                    <!-- ... toutes les autres caractéristiques ... -->
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
        console.log("hello")
        if (data.imagePath) this.cardElement.querySelector('#weatherImage').src = data.imagePath;
        if (data.tempMin) this._updateFeature('tempMin', data.tempMin);
        if (data.tempMax) this._updateFeature('tempMax', data.tempMax);
        if (data.rainProb) this._updateFeature('rainProb', data.rainProb);
        if (data.sunlight) this._updateFeature('sunlight', data.sunlight);
        if (data.latitude) this._updateFeature('latitude', data.latitude);
        if (data.longitude) this._updateFeature('longitude', data.longitude);
        if (data.precipitation) this._updateFeature('precipitation', data.precipitation);
        if (data.wind) this._updateFeature('wind', data.wind);
        if (data.windDirection) this._updateFeature('windDirection', data.windDirection);
    }

    toggleFeature(featureId, shouldShow) {
        const featureElement = this.cardElement.querySelector(`#${featureId}`);
        if (featureElement) {
            featureElement.style.display = shouldShow ? 'block' : 'none';
        }
    }

    _updateFeature(featureId, value) {
        const featureElement = this.cardElement.querySelector(`#${featureId} span`);
        console.log("Élément à mettre à jour:", featureElement);

        if (featureElement) {
            featureElement.innerText = value;
        }
    }
}




