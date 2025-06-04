// src/components/ForecastChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function ForecastChart({ forecastData }) {
  if (!forecastData) return null;

  // Simplify by taking one forecast per day (midday)
  const dailyData = forecastData.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const labels = dailyData.map((item) =>
    new Date(item.dt * 1000).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  );

  const temps = dailyData.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temp (°C)",
        data: temps,
        fill: false,
        borderColor: "#3b82f6", // Tailwind blue-500
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4, // smooth curve
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend for simplicity
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#2563eb", // blue-600
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        grid: {
          color: "#d1d5db", // Tailwind gray-300
        },
        ticks: {
          color: "#374151", // gray-700
          font: { size: 12 },
          stepSize: 5,
        },
        min: Math.min(...temps) - 5,
        max: Math.max(...temps) + 5,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-4 text-blue-700">5-Day Forecast</h4>
      <Line data={data} options={options} />
    </div>
  );
}

export default ForecastChart;
