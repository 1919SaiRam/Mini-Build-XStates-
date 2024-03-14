// import React, { useState, useEffect } from 'react';
// import './App.css';

// const CitySelector = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = () => {
//     fetch('https://crio-location-selector.onrender.com/countries')
//       .then(response => response.json())
//       .then(data => setCountries(data))
//       .catch(error => console.error('Error fetching countries:', error));
//   };

//   // const fetchStates = () => {
//   //   if (selectedCountry) {
//   //     fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
//   //       .then(response => response.json())
//   //       .then(data => setStates(data))
//   //       .catch(error => console.error('Error fetching states:', error));
//   //   }
//   // };

//   // const fetchCities = () => {
//   //   if (selectedCountry && selectedState) {
//   //     fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
//   //       .then(response => response.json())
//   //       .then(data => setCities(data))
//   //       .catch(error => console.error('Error fetching cities:', error));
//   //   }
//   // };

//   const fetchStates = () => {
//     if (selectedCountry) {
//       fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
//         .then(response => response.json())
//         .then(data => setStates(data))
//         .catch(error => {
//           console.error('Error fetching states:', error);
//           setStates([]); // Reset states state in case of error
//         });
//     }
//   };
  
//   const fetchCities = () => {
//     if (selectedCountry && selectedState) {
//       fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
//         .then(response => response.json())
//         .then(data => setCities(data))
//         .catch(error => {
//           console.error('Error fetching cities:', error);
//           setCities([]); // Reset cities state in case of error
//         });
//     }
//   };
  

//   const handleCountryChange = (event) => {
//     const country = event.target.value;
//     setSelectedCountry(country);
//     setSelectedState('');
//     setSelectedCity('');
//     fetchStates();
//   };

//   const handleStateChange = (event) => {
//     const state = event.target.value;
//     setSelectedState(state);
//     setSelectedCity('');
//     fetchCities();
//   };

//   const handleCityChange = (event) => {
//     const city = event.target.value;
//     setSelectedCity(city);
//   };

//   return (
//     <div className="city-selector">
//       <h1>Select location</h1>
//       <select value={selectedCountry} onChange={handleCountryChange}>
//         <option value="">Select Country</option>
//         {countries.map(country => (
//           <option key={country} value={country}>{country}</option>
//         ))}
//       </select>

//       <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
//         <option value="">Select State</option>
//         {states.map(state => (
//           <option key={state} value={state}>{state}</option>
//         ))}
//       </select>

//       <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
//         <option value="">Select City</option>
//         {Array.isArray(cities) && cities.map(city => (
//           <option key={city} value={city}>{city}</option>
//         ))}
//       </select>

//       {selectedCity && (
//         <div className="selected-location">
//           You selected {selectedCity}, {selectedState}, {selectedCountry}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CitySelector;


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
