require("dotenv").config()
const axios = require("axios")

console.log("This is weather app")

const API_KEY = process.env.API_KEY
// The current Weather can be fetched by location as well fro openweatherAPI
// But to understand callbacks, making two API calls

const getCurrentWeather = async () => {

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=28.6667&lon=77.2167&appid=${API_KEY}`

  try {
    const { data: currentWeather } = await axios.get(url)
    console.log(currentWeather)
  } catch (err) {
    console.log("Something went wrong!!")
  }
}

const getLocation = async () => {

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=Delhi&limit=1&appid=${API_KEY}`

  try {
    const { data: location } = await axios.get(url)

    if (location.length) {
      console.log("---------Success ---------\n", location)
    } else {
      console.log("Location not found!! Try again!!")
    }
  } catch (err) {
    console.log("Something went Wrong!!")
  }
}

getCurrentWeather()
getLocation()
// dfc51cfc5da8990dcc9a7a0239dd2762
