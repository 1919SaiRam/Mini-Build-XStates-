// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
    fetchCountries();
  }, []);


  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry) {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      }
    }
    fetchStates();
  }, [selectedCountry]);


  useEffect(() => {
    async function fetchCities() {
      if (selectedCountry && selectedState) {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    }
    fetchCities();
  }, [selectedCountry, selectedState]);


  
  return (
    <div className="App">
      <h1>Location Selector</h1>
      <div>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
}

export default App;
