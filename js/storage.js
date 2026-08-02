function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(cities) {
    localStorage.setItem("favorites", JSON.stringify(cities));
}

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
function renderFavorites() {
    favoritesContainer.innerHTML = "";

    getFavorites().forEach(city => {
        const button = document.createElement("button");
        button.className="favorite-city";

        button.innerHTML=
        `⭐ ${city}`;

        button.addEventListener("click", () => {
            getWeather(city);
        });

        favoritesContainer.appendChild(button);
    });
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

let currentCity = "";
