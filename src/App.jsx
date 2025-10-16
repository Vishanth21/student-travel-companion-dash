import { React, useState, createContext } from "react";
import TravelMedia from "./TravelMedia.jsx";
import Location from "./Location.jsx";
import Weather from "./Weather.jsx";

export const coordsContext = createContext();

function App() {
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  });

  return (
    <div className="main-dash">
      <h1>Smart Travel Companion Dashboard</h1>
      <div className="cards">
        <TravelMedia />
        <coordsContext.Provider value={{ coords, setCoords }}>
          <Location />
          <Weather />
        </coordsContext.Provider>
      </div>
    </div>
  );
}

export default App;