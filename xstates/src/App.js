import React, { useState, useEffect } from 'react';
import './App.css';

const CitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  };

  const fetchStates = () => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error));
    }
  };

  // const fetchCities = () => {
  //   if (selectedCountry && selectedState) {
  //     fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
  //       .then(response => response.json())
  //       .then(data => setCities(data))
  //       .catch(error => console.error('Error fetching cities:', error));
  //   }
  // };
  const fetchCities = () => {
    if (selectedCountry && selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => {
          console.error('Error fetching cities:', error);
          setCities([]); // Reset cities state in case of error
        });
    }
  };
  

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    fetchStates();
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
    fetchCities();
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  return (
    <div className="city-selector">
      <h1>Select location</h1>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
        <option value="">Select City</option>
        {Array.isArray(cities) && cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {selectedCity && (
        <div className="selected-location">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </div>
      )}
    </div>
  );
};

export default CitySelector;
