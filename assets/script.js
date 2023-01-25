var APIKey = '50fb092308cca79eb778f30f3444ef23'
var searchFormEl = document.querySelector('#search-form')
var textInput = document.querySelector('.textInput')
// weather API Specific Variables
var city
var stateCode
var countryCode
var latEl
var lonEl

// Search for a city by the name of the city

// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey

function getForecast() {
    var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latEl}&lon=${lonEl}&appid=${APIKey}&units=imperial&limit=5`
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

    console.log(textInput.value);
    city = textInput.value

    async function searchForecast() {
        const response = await fetch(getGeocode());
        const data = await response.json()
        console.log(data);
        latEl = data[0].lat
        lonEl = data[0].lon

        const forecast = await fetch(getForecast()).then(response => response.json()).then(displayWeather(data))
        console.log(forecast);
        console.log(forecast.list);



        var forecastEl = document.querySelector(".forecast-column")
        forecastEl.innerHTML = forecast.list.map((day) => {
            for (let i=0; i < 4; i++){
            
            // if (i >= 4) {
                let date = new Date(day.dt * 1000)
                let test = date.toLocaleDateString()
                console.log(test);
                return `<div class="card row">
                <div class="card-body">
                    <h5 class="card-title">${date.toLocaleDateString()}</h5>
                    <img src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                }@4x.png" alt="${day.weather[0].description}">
                    <p class="card-text temp" >Temp: ${day.main.temp} &deg;F</p>
                    <p class="card-text wind">Wind: ${day.wind.speed} MPH</p>
                    <p class="card-text humidity">Humidity: ${day.main.humidity}%</p>
                    </div>
                </div>`
            }
        }).join('');
        console.log(forecastEl);
    }
    
    
    // const current = await fetch(getCurrent()).then(response => response.json()).then(displayWeather(data))
    
    async function searchCurrent() {
        const response = await fetch(getGeocode());
        const data = await response.json()
        console.log(data);
        latEl = data[0].lat
        lonEl = data[0].lon
        const current = await fetch(getCurrent()).then(response => response.json())
        console.log(current);
        var currentEl = document.querySelector("#city-display")
        let date = new Date(current.dt * 1000)
        let test = date.toLocaleDateString()
        console.log(test);

        currentEl.innerHTML =  `<div class="container">
                     <h2>${current.name} (${date.toLocaleDateString()})</h5>
                    <i src="http://openweathermap.org/img/wn/${
                    current.weather[0].icon
                }@4x.png" alt="${current.weather[0].description}"></i>
                    <p class="card-text temp" >Temp: ${current.main.temp} &deg;F</p>
                    <p class="card-text wind">Wind: ${current.wind.speed} MPH</p>
                    <p class="card-text humidity">Humidity: ${current.main.humidity}%</p>
                    </div>
                </div>`
            };
        // const forecast = await fetch(getForecast()).then(response => response.json()).then(displayWeather(data))
        // console.log(forecast);
    
    
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
    

// Save searched cities in local storage

// Recall searched cities from local storage

// have ability to delete cities from local storage (wish not required)