import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [filter, setFilter] = useState('');

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
  }

  const updateDisplayCountries = (filter) => {
    let newDisplayCountries = [];

    if(filter != null) {
      newDisplayCountries = countries.filter((country) => country.name.official.toLowerCase().includes(filter.toLowerCase()));
    } else {
      newDisplayCountries = countries;
    }
    
    setDisplayCountries(newDisplayCountries);
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={displayCountries} filter={filter}/>
    </div>
  );
};

export default App;
