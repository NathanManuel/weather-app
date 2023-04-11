import React, { useEffect, useRef } from "react";

import "./styles/style.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Today = ({ todayData, fahrenheit }) => {
  var slider = document.getElementById("slider");
  //slides items to the left
  const slideLeft = () => {
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  //slides items to the right
  const slideRight = () => {
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const myRef = useRef(null);
  useEffect(() => {
    //slides the item with the myRef useRef into view
    myRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [todayData]);
  return (
    <div>
      {todayData ? (
        <div>
          <div className="day">Today's Forecast</div>
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
              {todayData.hour.map((weather, i) => {
                const dateNow = new Date();
                const now = dateNow.getHours();
                const date = new Date(weather.time);
                const hour = String(date.getHours()).padStart(2, "0");
                const minute = String(date.getMinutes()).padStart(2, "0");
                return (
                  <div
                    key={i}
                    className={
                      String(now) === hour
                        ? "inline-block description currentWeather"
                        : "inline-block description"
                    }
                    ref={String(now) === hour ? myRef : null}
                  >
                    {!fahrenheit ? (
                      <p> {Math.ceil(weather.temp_c)} &deg;C</p>
                    ) : (
                      <p> {Math.ceil(weather.temp_f)} &deg;F</p>
                    )}
                    <img
                      src={weather.condition.icon}
                      alt="Weather data by WeatherAPI.com"
                      border="0"
                    />
                    <p>
                      {hour}: {minute}
                    </p>
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

export default Today;
