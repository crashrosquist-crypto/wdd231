const myKey = "72180579163d32fc0d13728d49f6a0d6";
const myLat = "43.6629";
const myLong = "-116.6874";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=imperial&appid=${myKey}`;

export async function fetchWeather() {
    try {
        const currResponse = await fetch(currentUrl);
        if (currResponse.ok) {
            const currData = await currResponse.json();
            displayCurrentWeather(currData);
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}

function displayCurrentWeather(data) {
    const tempElement = document.querySelector('#current-temp');
    const descElement = document.querySelector('#weather-description'); 

    tempElement.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    
    const desc = data.weather[0].description;
    if (descElement) descElement.textContent = desc;
}

function displayForecast(data) {
    const forecastElement = document.querySelector('#forecast-list');
    if (!forecastElement) return;

    forecastElement.innerHTML = "";
    
    const nextThreeDays = data.list.filter((item, index) => index % 8 === 0).slice(1, 4);

    nextThreeDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const li = document.createElement('li');
        li.innerHTML = `${dayName}: <strong>${day.main.temp.toFixed(0)}&deg;F</strong>`;
        forecastElement.appendChild(li);
    });
}