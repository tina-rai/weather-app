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

const searchButton = document.getElementById("search-btn");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error-message");

const locationButton =
document.getElementById("location-btn");

locationButton.addEventListener("click", getCurrentLocation);

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

    errorMessage.textContent=message;

    cityName.textContent="City";

    temperature.textContent="--°C";

    description.textContent="Weather description";

    feelsLike.textContent="--°C";

    humidity.textContent="--%";

    wind.textContent="-- km/h";

    weatherIcon.hidden=true;
    tempMin.textContent="--°C";
    tempMax.textContent="--°C";
    visibility.textContent = "-- km";
}

async function getWeather(city){

    showLoading();

    const url=
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try{

        const response=await fetch(url);

        const data=await response.json();

        if(!response.ok){

            throw new Error("City not found.");

        }

        displayWeather(data);

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
        data.weather[0].description;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent =
        `${data.main.humidity}%`;
        visibility.textContent =
`${(data.visibility / 1000).toFixed(1)} km`;

    wind.textContent =
        `${data.wind.speed} m/s`;

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