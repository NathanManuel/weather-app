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
    <div className="App">
      <div className="topH">
        <h1 className="local">Weather app</h1>
        <div>
          <div>
            <input
              type="text"
              className="cityInput"
              value={input}
              placeholder="City name..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  fetchData(input);
                }
              }}
            />

            <button
              onClick={() => {
                fetchData(input);
              }}
            >
              Search
            </button>
          </div>
          <button
            onClick={() => {
              fetchData(local);
            }}
          >
            Local Weather
          </button>
          <button
            className="weatherType"
            onClick={() => setFahrenheit(!fahrenheit)}
          >
            {!fahrenheit ? <p>&deg;C</p> : <p>&deg;F</p>}
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
      {input && isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
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
    </div>
  );
}
