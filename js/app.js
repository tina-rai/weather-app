

locationButton.addEventListener("click", getCurrentLocation);


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", toggleTheme);

saveFavoriteButton.addEventListener("click", () => {
    if (!currentCity) return;

    const favorites = getFavorites();

    if (!favorites.includes(currentCity)) {
        favorites.push(currentCity);
        saveFavorites(favorites);
        renderFavorites();
    }
});

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("Submit event fired");

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    await getWeather(city);
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

//ref


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
    copyWeatherButton.textContent = "Copy Weather Details";
}, 1500);
});

initializeTabs();
unitToggle.addEventListener(
    "click",
    toggleTemperatureUnit
);
renderFavorites();
renderHistory();

