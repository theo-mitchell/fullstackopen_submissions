import CountryWeather from "./CountryWeather"; 

const Country = ({ country }) => {
  const getLanguagesListItems = (country) => {
    const content = [];

    for (const key in country.languages) {
      content.push(
        <li key={country.name.official + country.languages[key]}>
          {country.languages[key]}
        </li>
      );
    }

    if (content.length > 0) {
      return content;
    }
  };

  return (
    <>
      <h1>{country.name.official}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h4>Languages:</h4>
      <ul>{getLanguagesListItems(country)}</ul>
      <div>
        <img src={country.flags.png} alt="flag of selected country"></img>
      </div>
      <div>
        <CountryWeather country={country} />
      </div>
    </>
  );
};

export default Country;
