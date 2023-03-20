const Weather = ({ country, weather}) => {
  if (!weather.weather) {
    return
  }

  const temperature = (weather.main.temp - 273.15).toFixed(2)
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <p>temperature {temperature} Celcius</p>
      <img src={weatherIconUrl} alt={weather.weather[0].description}/>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
