import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Country from "./components/Country/Country";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const getCountriesHook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
      setDisplayCountries(res.data);
    });
  };
  useEffect(getCountriesHook, []);

  const handleFilterChange = (event) => {
    const currentFilter = event.target.value;

    setFilter(currentFilter);
    updateDisplayCountries(currentFilter);
  };

  const updateDisplayCountries = (filter) => {
    let newDisplayCountries = [];

    if (filter != null) {
      newDisplayCountries = countries.filter((country) =>
        country.name.official.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      newDisplayCountries = countries;
    }

    setDisplayCountries(newDisplayCountries);
  };

  const onShowCountry = (country) => {
    setDisplayCountries([country]);
    // setFilter('');
  }

  const renderContent = () => {
    if (displayCountries.length > 10 && filter.length > 0) {
      return <div>Too many matches, specify another filter</div>;
    } else if (displayCountries.length === 1) {
      return <Country country={displayCountries[0]} />;
    } else if (displayCountries.length === 0) {
      return <>No countries found</>;
    } else {
      return (
        <Countries 
          countries={displayCountries}
          onShowCountry={onShowCountry}
        />
      );
    }
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {renderContent()}
    </div>
  );
};

export default App;
