const API_KEY = "3ca483827fc892e57178e22dfd561fe0";

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

async function getForecast(city){

    const url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    displayForecast(data);

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