require("dotenv").config()
const axios = require("axios")

console.log("Weather Report\n----------------")

const API_KEY = process.env.API_KEY
// The current Weather can be fetched by location as well fro openweatherAPI
// But to understand callbacks, making two API calls

const getCurrentWeather = async (lat, lon) => {
  if (!lat || !lon) {
    return console.log("Location not found")
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  try {
    const { data: currentWeather } = await axios.get(url)

    console.log("Location: ", currentWeather.name)
    console.log("Latitude: ", currentWeather.coord.lat)
    console.log("Longitude: ", currentWeather.coord.lon)
    console.log("Description: ", currentWeather.weather[0].description)
    console.log("Temperature: ", currentWeather.main.temp)
  } catch (err) {
    console.log("Something went wrong!!")
  }
}

const getLocation = async (city, callback) => {
  if (!city) {
    return callback("Please enter a city")
  }

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`

  try {
    const { data: location } = await axios.get(url)
    if (location.length) {
      return callback(undefined, {
        name: location[0].name,
        lat: location[0].lat,
        lon: location[0].lon,
      })
    } else {
      return callback("Location not found!! Try again!!")
    }
  } catch (err) {
    console.log("Something went Wrong in getting Location!!")
  }
}

// getCurrentWeather()
getLocation("New York", (error, response) => {
  if (error) {
    return console.log(error)
  } else {
    return getCurrentWeather(response.lat, response.lon)
  }
})
// console.log(name, lat, long)
