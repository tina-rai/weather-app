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