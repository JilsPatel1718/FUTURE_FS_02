// src/App.jsx
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import toast from "react-hot-toast";
import ForecastChart from "./components/ForecastChart";

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
      toast.success(`${city} added to favorites!`);
    } else {
      toast("City already in favorites");
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((fav) => fav !== city));
    toast.success(`${city} removed from favorites`);
  };

  const [forecastData, setForecastData] = useState(null);

  const fetchForecastForCity = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error("Forecast data not found");
      const data = await res.json();
      setForecastData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (weatherData?.name) {
      fetchForecastForCity(weatherData.name);
    }
  }, [weatherData]);

  const fetchWeatherForCity = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      toast.success("Weather loaded!");
      setWeatherData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-cyan-100 p-6 sm:p-10 font-sans transition-all duration-300">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 animate-fade-in">
        🌤️ Weather Explorer
      </h1>

      <SearchBar setWeatherData={setWeatherData} />

      {weatherData && (
        <>
          <WeatherCard data={weatherData} />
          <button
            onClick={() => addFavorite(weatherData.name)}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded transition duration-300"
          >
            Add to Favorites
          </button>

          {forecastData && (
            <div className="mt-8">
              <ForecastChart forecastData={forecastData} />
            </div>
          )}
        </>
      )}

      {favorites.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">⭐ Favorite Cities</h3>
          <div className="flex flex-wrap gap-4">
            {favorites.map((city) => (
              <div
                key={city}
                className="flex items-center bg-white shadow-md px-4 py-2 rounded-xl gap-2 hover:scale-105 transition-transform duration-300"
              >
                <button
                  onClick={() => fetchWeatherForCity(city)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {city}
                </button>
                <button
                  onClick={() => removeFavorite(city)}
                  className="text-red-500 hover:text-red-700 font-bold"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
