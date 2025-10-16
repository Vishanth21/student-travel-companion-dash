import styles from "./Location.module.css";
import React, { useState, useContext } from "react";
import { coordsContext } from "./App";

function Location() {
  const { coords, setCoords } = useContext(coordsContext);
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
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
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
      ) : (!coords.latitude || !coords.longitude

      ) ? (<p>Click "Get Location" to see the coordinates.</p>) :
        (
          <>
            <div id="latitude">Latitude: {coords.latitude}</div>
            <div id="longitude">Longitude: {coords.longitude}</div>
          </>
        )}
    </div>
  );
}

export default Location;