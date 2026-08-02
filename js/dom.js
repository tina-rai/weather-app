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

const favoritesContainer = document.getElementById("favorites-container");




const historyList = document.getElementById("history-list");

// DOM references for controls
const saveFavoriteButton = document.getElementById("save-favorite");

//ref
const locationButton =
document.getElementById("location-btn");
//ref
const themeToggle = document.getElementById("theme-toggle");

    
//ref
const unitToggle = document.getElementById("unit-toggle");

const copyWeatherButton =
document.getElementById("copy-weather");