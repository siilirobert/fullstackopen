import { useEffect, useState } from 'react'

import Countries from './components/Countries';
import Filter from "./components/Filter";
import countriesService from './services/countries'
import weatherService from './services/weather'

function App() {

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => setCountries(response))
  }, [])

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const onShowCountry = (name) => {
    setFilter(name)
  }

  const getCurrentWeather = (country) => {
    return weatherService
      .getCurrentWeather(country)
      .then((response) => {
        setWeather(response)
      })
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        filter={filter}
        clickHandler={onShowCountry}
        weather={weather}
        getCurrentWeather={getCurrentWeather}
      />
    </div>
  )
}

export default App;
