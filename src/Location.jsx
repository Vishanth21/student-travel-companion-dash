import styles from "./Location.module.css";
import React, { useState } from "react";

function Location() {
  const [latitude, setLatitude] = useState("Unavailable");
  const [longitude, setLongitude] = useState("Unavailable");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function getLocation() {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }

  return (
    <div className={styles["location-body"]}>
      <h1 className={styles.header}>Locate Me</h1>
      <button className={styles.btn} onClick={getLocation}>Get Location</button>
      {loading ? (
        <div>Fetching location...</div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : (
        <>
          <div id="latitude">Latitude: {latitude}</div>
          <div id="longitude">Longitude: {longitude}</div>
        </>
      )}
    </div>
  );
}

export default Location;
