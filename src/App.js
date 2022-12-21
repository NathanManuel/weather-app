import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import "./homeStyle.css";
import axios from "axios";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [wData, setWData] = useState([]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  const fetchData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then((resul) => {
        if (resul.status !== 200) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        setIsPending(false);
        setError(null);
        console.log(resul.data);
        setWData([resul.data, ...wData]);
        // setWData(resul.data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });
  };

  const getLocation = async () => {
    if (input === "") {
      setWData(null);
    } else {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=50&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((result) => {
          if (result.status !== 200) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          result.data.forEach((element) => {
            fetchData(element.lat, element.lon);
          });
          // fetchData(result.data[0].lat, result.data[0].lon);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          }
        });
    }
  };

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
              getLocation();
            }}
          >
            Search
          </button>
          <button onClick={() => fetchData(lat, long)}>Local Weather</button>
        </div>
      </div>
      {!input && !wData && <h1>Input city name</h1>}
      {input && isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {wData[0] && (
        <div>
          {wData.map((weather) => {
            <div className="blog-preview" key={weather.id}>
              <Weather weatherData={weather} />
            </div>;
          })}
        </div>
      )}
    </div>
  );
}
