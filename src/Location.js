import React from "react";
import logo from "./images/geolocation.png"

const Location = props => {
  // console.log("location: ", props);
  return (
    <div className="card">
     <img className="card-logo" src={logo} alt="geolocation_logo" />
      <h2> Geo Location </h2>
      <p> Location: {props.location} </p>
      <p> Latitude: {props.lat} </p>
      <p> Longitude: {props.lon} </p>
      <p> Time Zone: {props.tz} </p>
      <p> GMT: {props.tzs} </p>
    </div>
  ); 
};

export default Location;
  