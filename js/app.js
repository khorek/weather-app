const _locationField = document.querySelector('.location');
const _degreesField = document.querySelector('.degrees');
const _feelsLikeField = document.querySelector('.feels-like');
const _conditionField = document.querySelector('.condition');
const _windMphField = document.querySelector('.wind-mph');
const _humidityField = document.querySelector('.humidity');

const _gifWeather = document.querySelector('.gif-feels');
const _gifCity = document.querySelector('.gif-city');

const _searchCityInput = document.querySelector('.search-city');
const _submitBtn = document.querySelector('.submit-btn');

// Функция которая возвращает GIF
async function getGif (place, value) {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=96dOgyBB8JEOXqFOTV1kBdosZRXYIveI&s=${value}`, {
            mode: 'cors'
        });
        const dataGif = await response.json();
        place.src = dataGif.data.images.original.url;    
    }
    catch (err) {
        place.src = 'https://thumbs.gfycat.com/BewitchedShamefulDobermanpinscher-max-14mb.gif';
        console.log(`Ooops this is error: ${err}`);
    }
}

// Функция которая получает данные о погоде с сервера
async function getWeather (location) {
    try {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=d0b5f7ed2238731eeaba5f71f14aec98`)
        .then((response) => {
            return response.json();
        })

        .then(async function (response) {
            console.log(response);

            if (response.cod == 200) {
                _locationField.textContent = `${response.name.toUpperCase()}, ${response.sys.country}`;
                _conditionField.textContent = response.weather[0].description;
    
                _degreesField.textContent = Math.round(response.main.temp);
                _feelsLikeField.textContent = `Ощущается как: ${Math.round(response.main.feels_like)}`;
                _windMphField.textContent =  `Ветер: ${Math.round(response.wind.speed)} м/с`;
                _humidityField.textContent = `Влажность: ${response.main.humidity}`;
    
                getGif(_gifCity, `'${response.name}'`);
                getGif(_gifWeather, `'${response.weather[0].main}'`);    
            }

            if (response.cod == 404) {
                alert('Oops we can`t find this city. Try again');
            }
    
        })

        .catch (function (err) {
            console.log(`Err: ${err}`);
            console.log(response.message);
        });

    } catch (e) {
        console.log(e);
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => getWeather('London'));

_submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(_searchCityInput.value);
});