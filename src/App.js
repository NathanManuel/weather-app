import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import Weather from "./Weather";
import "./homeStyle.css";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [wData, setWData] = useState();
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [local, setLocal] = useState();
  const [fahrenheit, setFahrenheit] = useState(false);

  const fetchData = async () => {
    try {
      setIsPending(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}&days=7&aqi=no&alerts=no`
      );
      const jsonD = await response.json();
      setWData(jsonD);
      setIsPending(false);
    } catch (error) {
      console.error(error);
    }
  };

  const localData = useCallback(async () => {
    try {
      setIsPending(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${local}&days=7&aqi=no&alerts=no`
      );
      const jsonD = await response.json();
      setWData(jsonD);
      setIsPending(false);
    } catch (error) {
      console.error(error);
    }
  }, [setWData, setIsPending, local]);

  const getLocation = useCallback(async () => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.REACT_APP_LOCATION_API}`;
      const response = await fetch(url);
      const data = await response.json();
      const city = data.results[0].components.city;
      setLocal(city);
    } catch (error) {
      console.error(error);
    }
  }, [lat, long, setLocal]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [setLat, setLong]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <div className="App">
      <div className="topH">
        <h1 className="local">Weather app</h1>
        <div>
          <input
            type="text"
            value={input}
            placeholder="City name..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={() => {
              fetchData();
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              localData();
            }}
          >
            Local Weather
          </button>
          <button onClick={() => setFahrenheit(!fahrenheit)}>
            {!fahrenheit ? <p>&deg;C</p> : <p>&deg;F</p>}
          </button>
        </div>
      </div>
      {!input && !wData && <h1>Input city name</h1>}
      {input && isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {wData && <Weather weatherData={wData} fahrenheit={fahrenheit} />}
    </div>
  );
}
