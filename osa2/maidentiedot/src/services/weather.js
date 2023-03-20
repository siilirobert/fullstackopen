import axios from 'axios'

const getCurrentWeather = (country) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY
  const [ lat, long ] = country.capitalInfo.latlng

  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(response => {
      return response.data
    })
}

export default { getCurrentWeather }
