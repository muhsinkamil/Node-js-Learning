require("dotenv").config()
const axios = require("axios")
const API_KEY = process.env.API_KEY

const getCurrentWeather = async (lat, lon, callback) => {

  if (!lat || !lon) {
    callback("Location not found")
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  try {
    const { data: currentWeather } = await axios.get(url)
    callback(undefined, currentWeather)

  } catch (err) {
    callback("Something went wrong!!")
  }
}

module.exports = getCurrentWeather