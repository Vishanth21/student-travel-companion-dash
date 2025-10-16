import styles from "./Location.module.css";
import React, { useState, useContext } from "react";
import { coordsContext } from "./App";
import axios from "axios";

function Weather() {
  const { coords } = useContext(coordsContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const request = axios.create({
    baseURL:
      "http://api.weatherapi.com/v1/current.json?key=5945cf9c883a44d081b101141251610&q=",
  });

  function getWeather() {
    if (!coords.latitude || !coords.longitude) {
      setError("Coordinates not available. Please fetch location first.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    request
      .get(coords.latitude + "," + coords.longitude)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  return (
    <div className={styles["location-body"]}>
      <h1 className={styles.header}>Weather Data</h1>
      <button className={styles.btn} onClick={getWeather}>
        Fetch Weather
      </button>
      <div id="weather">
        {loading ? (
          <div>Fetching weather...</div>
        ) : error ? (
          <div className={styles.error}>Error: {error}</div>
        ) : weatherData ? (
          <div>
            <h3>{weatherData.location.name}</h3>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
        ) : (
          <p>Click "Fetch Weather" to see the forecast.</p>
        )}
      </div>
    </div>
  );
}

export default Weather;