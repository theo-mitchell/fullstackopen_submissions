import axios from "axios";
import { useEffect, useState } from "react";

const CountryWeather = ({ country }) => {
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
  const [weather, setWeather] = useState({});

  const getWeatherHook = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=imperial&appid=${weather_api_key}`
      )
      .then((res) => {
        const newWeather = res.data;
        const icon = `http://openweathermap.org/img/wn/${newWeather.weather[0].icon}@2x.png`;
        setWeather({ ...newWeather, icon: icon });
      });
  };

  useEffect(getWeatherHook, [country, weather_api_key]);

  if (weather.main && weather.wind.speed) {
    return (
      <>
        <h3>Weather in {country.capital}</h3>
        <img src={weather.icon} alt="Weather Icon"></img>
        <div>temperature: {weather.main.temp}°F</div>
        <div>wind: {weather.wind.speed}mph</div>
      </>
    );
  }
};

export default CountryWeather;
