import "./styles/App.css";
import React, { useCallback, useEffect, useState } from "react";
import Weather from "./Weather";
import "./styles/homeStyle.css";

export default function App() {
  const [wData, setWData] = useState();
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [local, setLocal] = useState();
  const [fahrenheit, setFahrenheit] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchData = useCallback(
    async (city) => {
      try {
        setError("");
        setIsPending(true);
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&days=7&aqi=no&alerts=no`
        );
        const jsonD = await response.json();
        if (jsonD.location) {
          setWData(jsonD);
          setIsPending(false);
        } else {
          setError(`Location not found for city: ${city}`);
          setIsPending(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setWData, setIsPending]
  );

  const getCityByIP = useCallback(async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const city = data.city;
      return city;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCityByIP().then((city) => {
      setLocal(city);
    });
  }, [getCityByIP, setLocal]);
  useEffect(() => {
    if (local) {
      fetchData(local);
    }
  }, [local, fetchData]);

  return (
    <main className="App">
      <header className="topH">
        <h1 className="local">Weather app</h1>
        <div className="search-bar">
          <div>
            <input
              type="text"
              id="city-input"
              className="cityInput"
              value={input}
              placeholder="Enter city name"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setShowFavorites(false);
                  fetchData(input);
                }
              }}
            />
            <button
              onClick={() => {
                setShowFavorites(false);
                fetchData(input);
              }}
            >
              Search
            </button>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                setShowFavorites(false);
                fetchData(local);
              }}
            >
              Local Weather
            </button>
            <button
              className="weatherType"
              onClick={() => setFahrenheit(!fahrenheit)}
            >
              {!fahrenheit ? <span>&deg;C</span> : <span>&deg;F</span>}
            </button>
            <button
              className="favorites"
              onClick={() => {
                setShowFavorites(!showFavorites);
              }}
            >
              Favorites
            </button>
          </div>
        </div>
      </header>
      {input && isPending && <div className="header">Loading...</div>}
      {error && <div className="header">{error}</div>}
      {wData && !showFavorites && (
        <Weather
          weatherData={wData}
          fahrenheit={fahrenheit}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
      <div className="list">
        {showFavorites &&
          favorites.map((city, i) => (
            <button
              className="city"
              key={i}
              onClick={() => {
                setShowFavorites(false);
                fetchData(city);
              }}
            >
              {city}
            </button>
          ))}
      </div>
    </main>
  );
}
