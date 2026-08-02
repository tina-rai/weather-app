
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

saveHistory(currentCity);

currentTempCelsius = data.main.temp;

temperature.textContent =
    `${Math.round(currentTempCelsius)}°C`;
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


function toggleTheme() {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    localStorage.setItem("theme", dark ? "dark" : "light");

    themeToggle.textContent =
        dark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

let isCelsius = true;
let currentTempCelsius = null;

function toggleTemperatureUnit() {

    if (currentTempCelsius === null) return;

    isCelsius = !isCelsius;

    if (isCelsius) {

        temperature.textContent =
            `${Math.round(currentTempCelsius)}°C`;

        unitToggle.textContent = "°F";

    } else {

        const fahrenheit =
            currentTempCelsius * 9 / 5 + 32;

        temperature.textContent =
            `${Math.round(fahrenheit)}°F`;

        unitToggle.textContent = "°C";

    }

}
function initializeTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".tab-panel");

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
}