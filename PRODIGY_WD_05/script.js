const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById('weatherInfo');
const errorDiv = document.getElementById('error');
const citySelect = document.getElementById('citySelect');
const cityInput = document.getElementById('cityInput');

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;
    errorDiv.style.display = 'none';
}

function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
        fetchWeather('Mumbai'); // Fallback to Mumbai on API error
    }
}

async function getWeatherByCity() {
    let city = citySelect.value || cityInput.value.trim();
    if (!city || !/^[a-zA-Z\s]+$/.test(city)) {
        city = 'Mumbai'; // Default to Mumbai for invalid or empty input
    }
    fetchWeather(city);
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        displayError('Geolocation is not supported by your browser');
        fetchWeather('Mumbai'); // Fallback to Mumbai
        return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error('Unable to fetch weather data');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            displayError(error.message);
            fetchWeather('Mumbai'); // Fallback to Mumbai on API error
        }
    }, () => {
        displayError('Unable to access location');
        fetchWeather('Mumbai'); // Fallback to Mumbai
    });
}

// Clear input field when selecting a city from dropdown
citySelect.addEventListener('change', () => {
    if (citySelect.value) {
        cityInput.value = '';
    }
});

// Fetch Mumbai weather on page load
window.addEventListener('load', () => {
    fetchWeather('Mumbai');
});