const getLocation = require("./utils/getLocation")
const getCurrentWeather = require("./utils/getCurrentWeather")

console.log("Weather Report\n----------------")

getLocation("Boston", (error, response) => {
  if (error) {
    return console.log(error)
  } else {
    getCurrentWeather(response.lat, response.lon, (error, currentWeather) => {
      if (error) {
        return console.log(error)
      } else {
        console.log("Location: ", currentWeather.name)
        console.log("Latitude: ", currentWeather.coord.lat)
        console.log("Longitude: ", currentWeather.coord.lon)
        console.log("Description: ", currentWeather.weather[0].description)
        console.log("Temperature: ", currentWeather.main.temp)
      }
    })
  }
})
