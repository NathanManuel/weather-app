import React, { useEffect } from "react";
import moment from "moment";
import "./style.css";
import Today from "./Today";
import WeekForcast from "./WeekForcast";

const Weather = ({ weatherData, fahrenheit }) => {
  return (
    <div className="main">
      {weatherData && (
        <div>
          <div className="top">
            <p className="header">
              {weatherData.location.name} : {weatherData.location.country}
            </p>
            <div className="header">
              {!fahrenheit ? (
                <div>{Math.ceil(weatherData.current.temp_c)} &deg;C</div>
              ) : (
                <div> {Math.ceil(weatherData.current.temp_f)} &deg;F</div>
              )}
            </div>
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
