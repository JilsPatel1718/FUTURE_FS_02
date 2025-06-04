import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function SearchBar({ setWeatherData }) {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${apiKey}`
      );
      setWeatherData(res.data);
      toast.success("Weather loaded!");
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      toast.error("City not found");
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-6 animate-fade-in">
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
