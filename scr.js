const apiKey = '1a1fce577898a9fff4bbb438ba6223a6';

    async function getWeatherByCity() {
      const city = document.getElementById('cityInput').value.trim();
      if (!city) {
        alert("Please enter a city name");
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }

    function getWeatherByLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        fetchWeather(url);
      }, () => {
        alert("Unable to retrieve your location.");
      });
    }

    async function fetchWeather(url) {
      try {
        document.getElementById("weatherResult").innerHTML = "Loading...";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Weather data not found. Please check the city name or your API key.");
        }

        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        document.getElementById("weatherResult").innerHTML = `❌ Error: ${error.message}`;
      }
    }

    function displayWeather(data) {
      const { name, main, weather, wind } = data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      document.getElementById("weatherResult").innerHTML = `
        <h2>Weather in ${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}" />
        <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
        <p>🌡️ Temperature: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
      `;
    }