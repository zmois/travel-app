import React from 'react'
import logo from "./images/weather.png"

const Weather = props => {
    return (
    <div className="card">
   <img className="card-logo" src={logo} alt="weather_logo" />
      <h2> Current weather in {props.city} {props.country} </h2>
      <p>Overall: {props.overall} </p>
      <p>Temperature: {props.weather.temp} °C  </p>
      <p>Humidity: {props.weather.humidity} % </p>
      <p>Wind: {props.wind} m/s </p>
      <p>Pressure: {props.weather.pressure} hPa</p>
    </div>

  );
};
export default Weather;