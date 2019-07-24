import React from "react";
import logo from "./images/airport.png"

const Airport = props => {
  return (
    <div className="card">
    <img className="card-logo" src={logo} alt="airport_logo" />
      <h2> List of airports near by {props.city} {props.country}</h2>
      <p> Airport Code: {props.code}</p>
      <p> Name: {props.name}</p>
    </div>
  );
};
export default Airport;
