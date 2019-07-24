import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul className="main-navbar"> 
      <li className="nav-item">
        <NavLink className="navlink" to="/location">
          Geo Location
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="navlink" to="/weather">
          Weather
        </NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="navlink" to="/airport">
          Airports
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
