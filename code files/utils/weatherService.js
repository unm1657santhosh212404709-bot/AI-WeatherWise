// Fetches live weather from OpenWeatherMap. Falls back to sample data when no API key is set.
const fallback = (city) => ({
  city, country: "N/A", temperature: 28, feelsLike: 30, humidity: 65,
  windSpeed: 3.5, condition: "partly cloudy", source: "fallback",
});

exports.getWeather = async (city) => {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) return fallback(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`;
  const res = await fetch(url);
  if (res.status === 404) { const e = new Error(`City "${city}" not found`); e.statusCode = 404; throw e; }
  if (!res.ok) { const e = new Error("Weather service unavailable"); e.statusCode = 502; throw e; }
  const d = await res.json();
  return {
    city: d.name, country: d.sys?.country, temperature: d.main.temp, feelsLike: d.main.feels_like,
    humidity: d.main.humidity, windSpeed: d.wind.speed, condition: d.weather[0].description,
    source: "openweathermap",
  };
};
