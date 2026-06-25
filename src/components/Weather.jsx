import React, { useState } from 'react';
import './weather.css';

const Weather = () => {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '9eab5afcd1c3c1dec91ce31da65b5e6e'; 

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (!search) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        alert('City not found');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Error fetching weather');
    }
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInputChange}
          className="search-input"
        />
        <button className="search-btn" onClick={handleSearch}>
          🔍
        </button>
      </div>

      {weatherData && (
        <>
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="sun-icon"
            />
          </div>

          <div className="temperature">
            <span className="temp-value">{Math.round(weatherData.main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>

          <div className="location">{weatherData.name}</div>

          <div className="weather-info">
            <div className="info-item">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4148/4148460.png"
                alt="humidity"
                className="icon"
              />
              <div className="text-group">
                <span className="info-value">{weatherData.main.humidity}%</span>
                <span className="info-label">Humidity</span>
              </div>
            </div>

            <div className="info-item">
              <img
                src="https://cdn-icons-png.flaticon.com/512/553/553416.png"
                alt="wind"
                className="icon"
              />
              <div className="text-group">
                <span className="info-value">{weatherData.wind.speed} km/h</span>
                <span className="info-label">Wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
