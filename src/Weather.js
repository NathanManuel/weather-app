import React, { useEffect, useState } from "react";
import "./styles/style.css";
import Today from "./Today";
import WeekForcast from "./WeekForcast";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Weather = ({ weatherData, fahrenheit, favorites, setFavorites }) => {
  const [add, setAdd] = useState(false);
  const days = weatherData.current.is_day;

  //removes city from favorites
  const removeCity = (cityToRemove) => {
    setAdd(false);
    const updatedCities = favorites.filter((city) => city !== cityToRemove);
    setFavorites(updatedCities);
  };

  //add city to favorites
  const addCity = (cityToAdd) => {
    if (!favorites.includes(cityToAdd)) {
      setAdd(true);
      setFavorites((prevF) => [...prevF, weatherData.location.name]);
    }
  };

  useEffect(() => {
    //checks if city is favorited
    if (favorites.includes(weatherData.location.name)) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }, [weatherData, favorites]);
  return (
    <div className={days !== 0 ? "mainDay" : "mainNight"}>
      {weatherData && (
        <div>
          <div className={days !== 0 ? "topDay" : "topNight"}>
            <p className="header">
              {weatherData.location.name} : {weatherData.location.country}
            </p>
            <div className="header">
              {!fahrenheit ? (
                <div className="weather">
                  <p>{Math.ceil(weatherData.current.temp_c)}</p> <p>&deg;C</p>
                </div>
              ) : (
                <div className="weather">
                  <p> {Math.ceil(weatherData.current.temp_f)}</p>
                  <p> &deg;F</p>
                </div>
              )}
            </div>
            {add ? (
              <button
                className={days !== 0 ? "selectDay" : "selectNight"}
                onClick={() => {
                  removeCity(weatherData.location.name);
                }}
              >
                <AiFillStar size={30} />
              </button>
            ) : (
              <button
                className={days !== 0 ? "selectDay" : "selectNight"}
                onClick={() => {
                  addCity(weatherData.location.name);
                }}
              >
                <AiOutlineStar size={30} />
              </button>
            )}
          </div>
          <div className="flex date">
            <p className="temp">{weatherData.current.condition.text}</p>
            <img
              src={weatherData.current.condition.icon}
              alt="Weather data by WeatherAPI.com"
              border="0"
            />
          </div>
          <div className="">
            <div className="temp flex">
              Temprature:
              {!fahrenheit ? (
                <div> {Math.ceil(weatherData.current.temp_c)} &deg;C</div>
              ) : (
                <div> {Math.ceil(weatherData.current.temp_f)} &deg;F</div>
              )}
            </div>
            <div className="temp flex">
              Feels like:
              {!fahrenheit ? (
                <div> {Math.ceil(weatherData.current.feelslike_c)} &deg;C</div>
              ) : (
                <div> {Math.ceil(weatherData.current.feelslike_f)} &deg;F</div>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="temp flex">
              Wind:
              {!fahrenheit ? (
                <div> {Math.ceil(weatherData.current.wind_kph)} km/h</div>
              ) : (
                <div> {Math.ceil(weatherData.current.wind_mph)} mp/h</div>
              )}
            </div>
            <p className="temp">Humidity: {weatherData.current.humidity} %</p>
          </div>

          <Today
            todayData={weatherData.forecast.forecastday[0]}
            fahrenheit={fahrenheit}
          />

          <WeekForcast
            week={weatherData.forecast.forecastday}
            fahrenheit={fahrenheit}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
