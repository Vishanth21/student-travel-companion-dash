import { React, useState, createContext } from "react";
import TravelMedia from "./TravelMedia.jsx";
import Location from "./Location.jsx";
import Weather from "./Weather.jsx";
import Converter from "./Converter.jsx";
import "./App.css";

export const coordsContext = createContext();

function App() {
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  });

  return (
    <coordsContext.Provider value={{ coords, setCoords }}>
      <div className="main-dash">
        <h1>Smart Travel Companion Dashboard</h1>
        <div className="cards">
          <TravelMedia />
          <Location />
          <Weather />
          <Converter />
        </div>
      </div>
    </coordsContext.Provider>
  );
}

export default App;