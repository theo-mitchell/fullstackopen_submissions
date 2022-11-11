const Countries = ({ countries, onShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.name.official}>
            {country.name.official} <button onClick={() => onShowCountry(country)}>show</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Countries;
