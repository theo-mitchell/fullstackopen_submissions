const Countries = ({ countries, filter }) => {
  console.log("rendering countries", countries);

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

  if (countries.length > 10 && filter != null) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return (
      <>
        <h1>{countries[0].name.official}</h1>
        <div>Capital: {countries[0].capital}</div>
        <div>Area: {countries[0].area}</div>
        <h4>Languages:</h4>
        <ul>{getLanguagesListItems(countries[0])}</ul>
        <div>
          <img src={countries[0].flags.png} alt="flag of selected country"></img>
        </div>
      </>
    );
  } else if (countries.length === 0) {
    return <>No countries found</>;
  } else {
    return (
      <ul>
        {countries.map((country) => {
          return <li key={country.name.official}>{country.name.official}</li>;
        })}
      </ul>
    );
  }
};

export default Countries;
