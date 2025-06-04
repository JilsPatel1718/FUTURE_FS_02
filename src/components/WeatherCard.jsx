import React from "react";

function WeatherCard({ data }) {
  if (!data) return null; // Don't render if no data yet

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-3xl shadow-xl p-6 mt-10 text-center animate-fade-in">
      <h2 className="text-4xl font-bold mb-2">
        {data.name}, {data.sys.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-6xl font-extrabold text-gray-800 mb-2">
        {Math.round(data.main.temp)}°C
      </p>
      <p className="capitalize text-lg text-gray-700 mb-4">
        {data.weather[0].description}
      </p>
      <div className="flex justify-around text-gray-600 text-sm mt-4">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind</p>
          <p>{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
