import Languages from "./Languages"
import Weather from "./Weather"

const Countries = ({ countries, filter, clickHandler, weather, getCurrentWeather }) => {
  const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filtered.length > 1) {
    return (
      <ul>
        {filtered.map((country) =>
          <li key={country.name.common}>{country.name.common}<button onClick={() => clickHandler(country.name.common)}>show</button></li>
        )}
      </ul>
    )
  } else if (filtered.length === 1) {
    const country = filtered[0]

    if (!weather.weather || weather.coord.lat.toFixed(2) !== country.capitalInfo.latlng[0].toFixed(2)) {
      getCurrentWeather(country)
    }

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <Languages languages={country.languages} />
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather country={country} weather={weather} />
      </div>
    )
  } else {
    return (
      <p>No countries match the filter</p>
    )
  }
}

export default Countries
