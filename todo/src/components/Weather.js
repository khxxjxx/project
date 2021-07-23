import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const API_KEY = 'db12e04819ac28353c1e63583c12d0ca';
  const [weather, setWeather] = useState({});

  const getWeather = (latitude, longitude) => {
    const area =
      latitude !== '' ? `lat=${latitude}&lon=${longitude}` : `id=1835848`;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?${area}&appid=${API_KEY}&units=metric`
      )
      .then(response => {
        const weather = {
          temp: `${Math.floor(response.data.main.temp)}℃`,
          name: response.data.name,
          weather: response.data.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
        };
        setWeather(weather);
      })
      .catch(() => {
        alert('위치정보를 불러오는데 실패했습니다');
      });
  };

  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
  };

  const error = () => {
    getWeather('');
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div className="weather">
      <img className="weather-icon" src={weather.icon} />
      <span className="temp">{weather.temp}</span>
      <span className="sky"> {weather.weather}</span>
      <span className="city"> {weather.name}</span>
    </div>
  );
};

export default Weather;
