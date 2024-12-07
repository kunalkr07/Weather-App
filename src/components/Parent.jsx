import React, { useState, useEffect } from "react";
import "./index.css";
import cloudsImage from '../assets/clouds.jpg';
import clearSkyImage from '../assets/sunny.jpg';
import rainImage from '../assets/rain.jpg';
import defaultImage from '../assets/default.jpg';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faWind, faWater } from "@fortawesome/free-solid-svg-icons";

const Parent = () => {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [background,setBackground]=useState('');


// background image chnages according to description
  const updateBackground = (description) => {
    let backgroundImage;

    if (description.includes("clouds")) {
      backgroundImage = `url(${cloudsImage})`;
    } else if (description.includes("clear sky")) {
      backgroundImage = `url(${clearSkyImage})`;
    } else if (description.includes("rain")) {
      backgroundImage = `url(${rainImage})`;
    } else {
      backgroundImage = `url(${defaultImage})`;
    }

    setBackground(backgroundImage); // Update the background state
  };

  const weatherReport = async (city = "aurangabad") => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=29dcdd3d5f64b67ebc1a576f72435a39&units=metric`;
      const fetchedData = await fetch(apiUrl);
      const convertedData = await fetchedData.json();

      console.log("API Data:", convertedData);
      setWeatherData(convertedData);

      const description = convertedData.weather[0].description.toLowerCase();
      updateBackground(description);
  
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }

  };

// search handle
  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      weatherReport(input);
    }
  };
// handle change
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
// starts auto when page load
  useEffect(() => {
    weatherReport();
  }, []);

  return (
    <div className="parent" style={{ backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* navbar */}
        <nav>
          <h3>Kunal's weather app</h3>
        </nav>

      {/* Header */}

      <header>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search your city"
            value={input}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
      </header>

      {/* Weather Details */}
      {weatherData ? (
        <div className="contents">
          <div className="temp">
            <h2>{Math.round(weatherData.main.temp)} <span>°C</span></h2>
            <span>{weatherData.name}</span>
            <p>{new Date(weatherData.dt * 1000) .toLocaleDateString("en-GB")
    .replace(/\//g, "-")}</p>
          </div>

          <div className="details">
            <div className="col">
              <FontAwesomeIcon icon={faWater} className="icon" />
              <div className="col-details">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>{weatherData.weather[0].description
                }</p>
              </div>
            </div>

            <div className="col">
              <FontAwesomeIcon icon={faWind} className="icon" />
              <div className="col-details">
                <p>Wind Speed</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading Data, please wait!</p>
      )}
    </div>
  );
};

export default Parent;
