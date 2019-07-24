import React from "react";
import { Route, HashRouter } from "react-router-dom";
import "./App.css";

import Nav from "./Nav";
import Airport from "./Airport";
import Weather from "./Weather";
import Location from "./Location";
import Footer from "./Footer";

const API_KEY = '';
const OPEN_WEATHER = '';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Sets the initial state
    this.state = {
      //  common query for all APIs
      cityInput: "",
      //   weather props
      city: "",
      country: "",
      weather: "",
      wind: "",
      overall: [],
      //   airport props
      airports: [],
      //   geolocation props
      location:"",
      latitude: "",
      longitude: "",
      tz: "",
      tzs:"",
      //  Returns true or false depending on whether or not your API request has succeeded.
      isLoading: false,
      //   Error if API request fails
      airportError: false,
      weatherError: false,
      locationError: false
    };
  }
  // City Search for Weather API
  citySearch = async () => {
    this.setState({isLoading: true, weatherError: false})

    try {
    const responseWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        this.state.cityInput}&units=metric&APPID=${OPEN_WEATHER}`
    );
        const jsonWeather = await responseWeather.json();
   
    //  set the new State
    this.setState({
      overall: jsonWeather.weather[0].description,
      weather: jsonWeather.main,
      wind: jsonWeather.wind.speed,
      city: jsonWeather.name,
      country: jsonWeather.sys.country,
      isLoading: false
    });
    //  logging out the new state
    console.log(this.state.overall);
  } catch (e) {
    this.setState({isLoading: false, weatherError: true})
  }
  };

  //   Airport Search for Airpotr API
  airportSearch = async () => {
    this.setState({isLoading: true, airportError: false})
    try {
    const responseAirport = await fetch(
      `https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text?text=${
        this.state.cityInput}`,
      {
        headers: {
          "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
          "X-RapidAPI-Key": API_KEY
        }
      }
    );
    const jsonAirport = await responseAirport.json();
    console.log(jsonAirport);
   
    await this.setState({
      airports: jsonAirport,
      isLoading: false
    });
    //  logging out the new state
    console.log(this.state.airports);
  }catch (e) {
    this.setState({isLoading: false, airportError: true})
  }
  };

  //   Currency Search for  API
  locationSearch = async () => {
    this.setState({isLoading: true, locationError: false})
     try{
    const responseLocation = await fetch(
      `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${
        this.state.cityInput}`,
      {
        headers: {
          "X-RapidAPI-Host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
          "X-RapidAPI-Key": API_KEY
        }
      }
    );
    // console.log(responseLocation);
    const jsonLocation = await responseLocation.json();
    
    //  set the new State
    this.setState({
      location: jsonLocation.Results[0].name, 
      longitude: jsonLocation.Results[0].lon,
      latitude: jsonLocation.Results[0].lat,
      tz: jsonLocation.Results[0].tz,
      tzs:jsonLocation.Results[0].tzs,
      isLoading: false
    });
    //  logging out the new state
     console.log(this.state.tzs);
  } catch (e) {
      this.setState({isLoading: false, locationError: true})
     
    }
  };

  // Search Function for all Routes
  Search = () => {
    this.citySearch();
    this.airportSearch();
    this.locationSearch();
  };

   onCityChange = event => {
    // updates the state to match the event target value
    this.setState({ cityInput: event.target.value });
  };
  
  //  Search form for all API 
  renderFormCity() {
    return (
      <form onSubmit={this.Search}>
        <input
          placeholder="Search for city"
          type="text"
          value={this.state.cityInput}
          onChange={this.onCityChange}
        />
        <br />
      </form>
    );
  }

  // Rendering the Data
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <div className="App">
            <h1>Welcome to the Travel App</h1>
            <p>
              This app helps to get a basic information that needed to know
              when you plan the trip.
            </p>
            <p>
              Simply <strong>enter the City</strong> where you are planning
              to travel and then scroll through the tabs.
            </p>
            <hr />
           {/*  serch form */}
            <div>
              {this.renderFormCity()}
            </div>

            <Nav />
            <Route
              path="/weather"
              component={() => (
                <Weather
                  error={this.state.weatherError}
                  overall={this.state.overall}
                  weather={this.state.weather}
                  wind={this.state.wind}
                  city={this.state.city}
                  country={this.state.country}
                                  />
              )}
            />
            <Route
              path="/location"
              component={() => (
                <Location
                error={this.state.locationError}
                  location={this.state.location}
                  lat={this.state.latitude}
                  lon={this.state.longitude}
                  tz={this.state.tz}
                  tzs={this.state.tzs}
                />
              )}
            />
            <Route
              path="/airport"
              component={() => {
                if (this.state.isLoading) return <h1>Loading...</h1>;
                
                return this.state.airports.filter(airport => {
                  return this.state.cityInput === airport.city.toLowerCase()
                 }).map(airport => (
                  <Airport
                    error={this.state.airportError}
                    key={airport.airportId}
                    code={airport.code}
                    name={airport.name}
                    city={airport.city}
                    country={airport.countryCode}
                  />
                ));
              }}
            />
          
          </div>
        </HashRouter>
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;
