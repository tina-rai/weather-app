const API_KEY = "3ca483827fc892e57178e22dfd561fe0";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const tempMin = document.getElementById("temp-min");
const tempMax = document.getElementById("temp-max");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const lastUpdated = document.getElementById("last-updated");
const forecastContainer = document.getElementById("forecast-container");

const searchButton = document.getElementById("search-btn");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error-message");

const locationButton =
document.getElementById("location-btn");

locationButton.addEventListener("click", getCurrentLocation);

const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    localStorage.setItem("theme", dark ? "dark" : "light");

    themeToggle.textContent = dark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});
const saveFavoriteButton = document.getElementById("save-favorite");
const favoritesContainer = document.getElementById("favorites-container");

let currentCity = "";

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(cities) {
    localStorage.setItem("favorites", JSON.stringify(cities));
}

function renderFavorites() {
    favoritesContainer.innerHTML = "";

    getFavorites().forEach(city => {
        const button = document.createElement("button");
        button.className = "favorite-city";
        button.textContent = city;

        button.addEventListener("click", () => {
            getWeather(city);
        });

        favoritesContainer.appendChild(button);
    });
}

saveFavoriteButton.addEventListener("click", () => {
    if (!currentCity) return;

    const favorites = getFavorites();

    if (!favorites.includes(currentCity)) {
        favorites.push(currentCity);
        saveFavorites(favorites);
        renderFavorites();
    }
});

renderFavorites();

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    temperature.textContent = "Loading...";
    description.textContent = "";
    feelsLike.textContent = "--°C";
    humidity.textContent = "--%";
    wind.textContent = "-- km/h";
    
    await getWeather(city);
    cityInput.value = "";
});

function showLoading(){

    loading.hidden=false;

    searchButton.disabled=true;

    errorMessage.textContent="";
}

function hideLoading(){

    loading.hidden=true;

    searchButton.disabled=false;
}

function showError(message){

    errorMessage.innerHTML = `
        <div class="error-card">
            <div class="error-icon">❌</div>
            <p><strong>${message}</strong></p>
            <p>Try another city name.</p>
        </div>
    `;

    cityName.textContent = "City";
    temperature.textContent = "--°C";
    description.textContent = "Weather description";
    feelsLike.textContent = "--°C";
    humidity.textContent = "--%";
    visibility.textContent = "-- km";
    wind.textContent = "-- km/h";
    sunrise.textContent = "--:--";
    sunset.textContent = "--:--";
    lastUpdated.textContent = "Last Updated: --";

    weatherIcon.hidden = true;
}

async function getWeather(city){

    showLoading();

    const url=
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try{

        const response=await fetch(url);

        const data=await response.json();

        if(!response.ok){

            throw new Error("Oopsie! City not found.");

        }

        displayWeather(data);

        await getForecast(city);

    }
    catch(error){

        showError(error.message);

    }
    finally{

        hideLoading();

    }

}
//helper function
function formatTime(unixTime) {

    const date = new Date(unixTime * 1000);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}

function currentTime() {

        return new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        });
    
    }

function displayWeather(data) {

    errorMessage.textContent="";

    cityName.textContent = data.name;

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;

    tempMin.textContent =
       `${Math.round(data.main.temp_min)}°C`;

    tempMax.textContent =
      `${Math.round(data.main.temp_max)}°C`;

      description.textContent =
      formatDescription(
          data.weather[0].main,
          data.weather[0].description
      );

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;
        visibility.textContent =
`${(data.visibility / 1000).toFixed(1)} km`;

    wind.textContent =
`${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    const iconCode = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

     weatherIcon.alt =
     data.weather[0].description;

    weatherIcon.hidden = false;

    sunrise.textContent =
    formatTime(data.sys.sunrise);

    sunset.textContent =
    formatTime(data.sys.sunset);

    lastUpdated.textContent =
`Last Updated: ${currentTime()}`;

updateBackground(
    data.weather[0].main
);

currentCity = data.name;
saveHistory(data.name);

currentTempCelsius = data.main.temp;

temperature.textContent =
    `${Math.round(currentTempCelsius)}°C`;

    console.log("A");

currentCity = data.name;

console.log("B");

saveHistory(data.name);

console.log("C");

currentTempCelsius = data.main.temp;

console.log("D");

temperature.textContent =
`${Math.round(currentTempCelsius)}°C`;

console.log("E");
}

function getCurrentLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(
        success,
        error
    );
 
}

async function success(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    displayWeather(data);

}

function error() {

    alert("Unable to retrieve location.");

}

function updateBackground(condition){

    condition = condition.toLowerCase();

    const themes = {

        clear: "linear-gradient(135deg,#56CCF2,#2F80ED)",

        clouds: "linear-gradient(135deg,#757F9A,#D7DDE8)",

        rain: "linear-gradient(135deg,#314755,#26A0DA)",

        drizzle: "linear-gradient(135deg,#5C7C8A,#9DB4C0)",

        thunderstorm:"linear-gradient(135deg,#232526,#414345)",

        snow:"linear-gradient(135deg,#E6DADA,#274046)",

        mist:"linear-gradient(135deg,#606c88,#3f4c6b)",

        haze:"linear-gradient(135deg,#bdc3c7,#2c3e50)",

        fog:"linear-gradient(135deg,#485563,#29323c)",

        smoke:"linear-gradient(135deg,#434343,#000000)",

        dust:"linear-gradient(135deg,#C79081,#DFA579)",

        sand:"linear-gradient(135deg,#C2B280,#E8D7A4)",

        ash:"linear-gradient(135deg,#3E5151,#DECBA4)",

        squall:"linear-gradient(135deg,#0F2027,#203A43)",

        tornado:"linear-gradient(135deg,#232526,#000000)"

    };

    if (!document.body.classList.contains("dark")) {

        document.body.style.background =
            themes[condition] || "#e8f4ff";
    
    }
}
async function getForecast(city){

    const url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    displayForecast(data);

}

function displayForecast(data){

    forecastContainer.innerHTML = "";

    const dailyForecast = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyForecast.forEach(day=>{

        const date = new Date(day.dt_txt);

        const weekday =
date.toLocaleDateString([],{
            weekday:"short"
        });

        const icon =
`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        const rain =
Math.round((day.pop || 0)*100);

        forecastContainer.innerHTML += `

        <div class="forecast-card">

            <h3>${weekday}</h3>

            <img src="${icon}">

            <p>${Math.round(day.main.temp)}°C</p>

            <p>🌧️ ${rain}%</p>

        </div>

        `;

    });

}
const historyList = document.getElementById("history-list");

function getHistory() {
    return JSON.parse(localStorage.getItem("history")) || [];
}

function saveHistory(city) {
    let history = getHistory().filter(item => item !== city);

    history.unshift(city);

    history = history.slice(0, 5);

    localStorage.setItem("history", JSON.stringify(history));

    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";

    getHistory().forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;

        li.addEventListener("click", () => {
            getWeather(city);
        });

        historyList.appendChild(li);
    });
}

renderHistory();

const unitToggle = document.getElementById("unit-toggle");

let isCelsius = true;
let currentTempCelsius = null;

unitToggle.addEventListener("click", () => {
    if (currentTempCelsius === null) return;

    isCelsius = !isCelsius;

    if (isCelsius) {
        temperature.textContent =
            `${Math.round(currentTempCelsius)}°C`;
        unitToggle.textContent = "°F";
    } else {
        const f = currentTempCelsius * 9 / 5 + 32;
        temperature.textContent =
            `${Math.round(f)}°F`;
        unitToggle.textContent = "°C";
    }
});

document.addEventListener("keydown", (event) => {

    if (
        event.key === "/" &&
        document.activeElement !== cityInput
    ) {
        event.preventDefault();
        cityInput.focus();
    }

});

const copyWeatherButton =
document.getElementById("copy-weather");

copyWeatherButton.addEventListener("click", async () => {

    const text = `
${cityName.textContent}
${temperature.textContent}
${description.textContent}
Feels Like: ${feelsLike.textContent}
Humidity: ${humidity.textContent}
Wind: ${wind.textContent}
`;

    await navigator.clipboard.writeText(text.trim());

    copyWeatherButton.textContent = "Copied!";

    setTimeout(() => {
        copyWeatherButton.textContent =
            "Copy Weather";
    }, 1500);

});

function formatDescription(weatherMain, description) {

    const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Fog: "🌁",
        Haze: "🌤️"
    };

    return `${icons[weatherMain] || "🌍"} ${description}`;
}
const tabs =
document.querySelectorAll(".tab-btn");

const panels =
document.querySelectorAll(".tab-panel");

tabs.forEach(button => {

    button.addEventListener("click", () => {

        tabs.forEach(tab =>
            tab.classList.remove("active")
        );

        panels.forEach(panel =>
            panel.classList.remove("active")
        );

        button.classList.add("active");

        document
            .getElementById(button.dataset.tab)
            .classList.add("active");

    });

});