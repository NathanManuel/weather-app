import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import "./homeStyle.css";
import axios from "axios";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [wData, setWData] = useState(null);
  const [input, setInput] = useState("London");
  var items = [];
  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  const fetchData = (lat, lon) => {
    // result.forEach((element) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=1275b93611b16702113c58a6beab698d`
      )
      .then((resul) => {
        setWData(resul.data);
      });

    // });
  };

  const getLocation = async () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=50&appid=1275b93611b16702113c58a6beab698d`
      )
      .then((result) => {
        // fetchData(result);
        fetchData(result.data[0].lat, result.data[0].lon);
      });
  };

  return (
    <div className="App">
      <div className="topH">
        <h1 className="local">Weather app</h1>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => {
              getLocation();
            }}
          >
            Search
          </button>
          <button onClick={() => fetchData(lat, long)}>Local Weather</button>
        </div>
      </div>
      {wData && (
        <div className="blog-preview" key={wData.id}>
          <Weather weatherData={wData} />
        </div>
      )}
    </div>
  );
}
