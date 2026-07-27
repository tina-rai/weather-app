const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    cityName.textContent = city;
    temperature.textContent = "25°C";
    description.textContent = "Sunny";
    feelsLike.textContent = "27°C";
    humidity.textContent = "60%";
    wind.textContent = "10 km/h";

    cityInput.value = "";
});