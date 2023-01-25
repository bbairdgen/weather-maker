var APIKey = '50fb092308cca79eb778f30f3444ef23'
var searchFormEl = document.querySelector('#search-form')

// weather API Specific Variables
var city = 'London'
var stateCode
var countryCode
var latEl
var lonEl

// Search for a city by the name of the city

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey

function getForecast() {
    var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latEl}&lon=${lonEl}&appid=${APIKey}&units=imperial`
    return forecastURL
}

function getGeocode() {
    var geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
    return geocodeURL
}

function getCurrent() {
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latEl}&lon=${lonEl}&appid=${APIKey}&units=imperial`
    return currentURL
}


function search(event) {
    event.preventDefault();

    async function searchForecast() {
        const response = await fetch(getGeocode());
        const data = await response.json()
        console.log(data);
        latEl = data[0].lat
        lonEl = data[0].lon

        const forecast = await fetch(getForecast()).then(response => response.json()).then(displayWeather(data))
        
        if (forecast )
        console.log(forecast);
        // const current = await fetch(getCurrent()).then(response => response.json()).then(displayWeather(data))
    }
    // async function searchCurrent() {
    //     const response = await fetch(getGeocode());
    //     const data = await response.json()
    //     console.log(data);
    //     latEl = data[0].lat
    //     lonEl = data[0].lon

    //     // const forecast = await fetch(getForecast()).then(response => response.json()).then(displayWeather(data))
    //     // console.log(forecast);
    //     const current = await fetch(getCurrent()).then(response => response.json())

    // }
    return searchForecast(), searchCurrent()
}


function displayWeather(response) {
    console.log(response);
}

// Search form event listener

searchFormEl.addEventListener("submit", search)

    // Convert string text to Lat and Long

    // Query pull from weather API

    // Display current conditions of searched/selected city

    // Display 5-day forecast of city
    
    // var forecastEl = document.querySelector(".forecast-column")
    // `<div class="card">
    //     <div class="card-body">
    //         <h5 class="card-title">${dt.toDateSTring()}</h5>
    //         <img src="" alt="Weather Description">
    //             <p class="card-text temp" >Temp: ${temp}&deg;F</p>
    //             <p class="card-text wind">Wind: ${wind} MPH</p>
    //             <p class="card-text humidity">Humidity: ${humidity}%</p>
    //     </div>
    // </div>`

// Save searched cities in local storage

// Recall searched cities from local storage

// have ability to delete cities from local storage (wish not required)