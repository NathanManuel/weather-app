import React, { useEffect } from "react";
import moment from "moment";
import "./style.css";

const refresh = () => {
  window.location.reload();
};

const CardExampleCard = ({ weatherData }) => {
  return (
    <div className="main">
      {weatherData && (
        <div>
          <div className="top">
            <p className="header">
              {weatherData.name} : {weatherData.sys.country}
            </p>
          </div>
          <div className="flex date">
            <p className="day">
              {moment().format("dddd")}, <span>{moment().format("LL")}</span>
            </p>
            <div className="f">
              <p className="description">{weatherData.weather[0].main}:</p>
              <p className="description">
                {weatherData.weather[0].description}
              </p>
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            />
          </div>

          <div className="flex">
            <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>

            <p className="temp">Humidity: {weatherData.main.humidity} %</p>
          </div>
          <div className="flex">
            <p className="temp">
              Feels like: {weatherData.main.feels_like} &deg;C
            </p>
          </div>
          <div className="flex">
            <p className="temp">
              Min temprature: {weatherData.main.temp_min} &deg;C
            </p>
            <p className="temp">
              Max temprature: {weatherData.main.temp_max} &deg;C
            </p>
          </div>

          <div className="flex">
            <p className="sunrise-sunset">
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
            <p className="sunrise-sunset">
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardExampleCard;
