import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import LocationService from "./Services/LocationService";

function App() {
  useEffect(() => {
    LocationService.getAllLocations("Kolkata").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
