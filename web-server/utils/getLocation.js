require("dotenv").config()
const axios = require("axios")

const API_KEY = process.env.API_KEY
// The current Weather can be fetched by location as well fro openweatherAPI
// But to understand callbacks, making two API calls

const getLocation = async (city, callback) => {
  if (!city) {
    callback("Please enter a city")
  } else {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`

    try {
      const { data: location } = await axios.get(url)
      if (location.length) {
        callback(undefined, { lat: location[0].lat, lon: location[0].lon })
      } else {
        callback("Location not found!! Try again!!")
      }
    } catch (err) {
      callback("Something went wrong !! Could not get Location")
    }
  }
}

module.exports = getLocation
