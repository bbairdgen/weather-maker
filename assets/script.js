var APIKey = '50fb092308cca79eb778f30f3444ef23'
var searchFormEl = document.querySelector('#search-form')
var textInput = document.querySelector('.textInput')
// weather API Specific Variables
var city

var latEl
var lonEl
var cityHistory = []
var searchTxt = ''

// Search for a city by the name of the city

function getForecast() {
    var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latEl}&lon=${lonEl}&appid=${APIKey}&units=imperial&limit=5`
    return forecastURL
}

function getGeocode() {
    var geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTxt}&appid=${APIKey}`
    return geocodeURL
}

function getCurrent() {
    var currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latEl}&lon=${lonEl}&appid=${APIKey}&units=imperial`
    return currentURL
}

function saveToLocalStorage() {
    textInput.value = ''
    if (cityHistory.includes(searchTxt)){
        return
    }
    cityHistory.push(searchTxt)
    localStorage.setItem('City', JSON.stringify(cityHistory))
}
var historyEl = document.querySelector('#history')

function renderHistory() {
    historyEl.innerHTML = ''
    for (var i = 0; i < cityHistory.length; i++) {
        var history = cityHistory[i]

        var btn = document.createElement("button");
        btn.textContent = history
        btn.setAttribute("data-value", cityHistory[0])
        btn.classList.add("m-1")
        btn.classList.add("bedtime")
        
        historyEl.appendChild(btn)

    }
}

historyEl.addEventListener('click', function(event) {
var btn = event.target
console.log(btn.innerText);
searchTxt = btn.innerText 
search()
})

function init() {
    var storedHistory = JSON.parse(localStorage.getItem("City"))
    
    if (storedHistory !== null) {
        cityHistory = storedHistory;
    }
    renderHistory()
}


function search(event) {
    console.log(event);
    if (event) {
        event.preventDefault();}

    async function searchForecast() {
        const response = await fetch(getGeocode());
        const data = await response.json()
        // console.log(data);
        latEl = data[0].lat
        lonEl = data[0].lon

        const forecast = await fetch(getForecast()).then(response => response.json())
        // console.log(forecast);
        console.log(forecast.list);

        var forecastEl = document.querySelector(".forecast-column")
        forecastEl.innerHTML = forecast.list.map((day) => {

            if (day.dt_txt.endsWith('00:00:00')) {
                let date = new Date(day.dt * 1000)
                let test = date.toLocaleDateString()
                console.log(test);
                return `<div class="d-flex card m-2 border bg-drk ">
                <div class="card-body sleep">
                <h5 class="card-title">${date.toLocaleDateString()}</h5>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon
                    }@4x.png" alt="${day.weather[0].description}" class="icon-shrink"><br>
            <p class="card-text temp" >Temp: ${day.main.temp} &deg;F</p>
            <p class="card-text wind">Wind: ${day.wind.speed} MPH</p>
            <p class="card-text humidity">Humidity: ${day.main.humidity}%</p>
            </div>
            </div>`
            }
    
        }).join('');
        // console.log(forecastEl);
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

        currentEl.innerHTML = `<div class="container border p-1 m-1">
    <h2>${current.name} (${date.toLocaleDateString()}) <img src="http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png" id="current-icon" alt="${current.weather[0].description}"></h2>
    <p class="card-text temp" >Temp: ${current.main.temp} &deg;F</p>
    <p class="card-text wind">Wind: ${current.wind.speed} MPH</p>
    <p class="card-text humidity">Humidity: ${current.main.humidity}%</p>
    </div>
    </div>
    <h3>5-Day Forecast</h3>`
    };
    // const forecast = await fetch(getForecast()).then(response => response.json()).then(displayWeather(data))
    // console.log(forecast);

    saveToLocalStorage()
    renderHistory()

    return searchForecast(), searchCurrent()
}




// Search form event listener

searchFormEl.addEventListener("submit", search)
textInput.addEventListener("change", function() {
    searchTxt = textInput.value
})

init()







// have ability to delete cities from local storage (wish not required)