import React, { useEffect, useRef, useState } from "react";

import "./style.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const WeekForcast = ({ week, fahrenheit }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div>
      {week ? (
        <div>
          <div className="day">Week Forcast</div>
          <div className="relative flex items-center">
            <MdChevronLeft
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={slideLeft}
              color="white"
              size={30}
            />
            <div
              id="slider"
              className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {week.map((weather, i) => {
                const date = new Date(weather.date);

                return (
                  <div key={i} className="inline-block description">
                    {!fahrenheit ? (
                      <p> {Math.ceil(weather.day.avgtemp_c)} &deg;C</p>
                    ) : (
                      <p> {Math.ceil(weather.day.avgtemp_f)} &deg;F</p>
                    )}
                    <img
                      src={weather.day.condition.icon}
                      alt="Weather data by WeatherAPI.com"
                      border="0"
                    />
                    {i === 0 ? (
                      <div>Today</div>
                    ) : (
                      <div>
                        {date.toLocaleDateString("en-us", { weekday: "long" })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <MdChevronRight
              className="opacity-50 cursor-pointer hover:opacity-100"
              onClick={slideRight}
              color="white"
              size={30}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="forcastText">Forcast today</div>
          <div className="date">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default WeekForcast;
