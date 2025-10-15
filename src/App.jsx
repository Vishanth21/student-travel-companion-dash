import TravelMedia from "./TravelMedia.jsx";
import Location from "./Location.jsx";
function App() {
  return (
    <div className="main-dash">
      <h1>Smart Travel Companion Dashboard</h1>
      <div className="cards">
        <TravelMedia/>
        <Location/>
      </div>
    </div>


  );
}

export default App;