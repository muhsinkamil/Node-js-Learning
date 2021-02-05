const form = document.querySelector("form")
const searchLocation = document.querySelector("#search-location")

const locationText = document.querySelector("#location")
const weatherText = document.querySelector("#weather")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  locationText.textContent = "Loading..."
  weatherText.textContent = ""

  fetch(`/weather?location=${searchLocation.value}`)
    .then((res) => res.json())
    .then((res) => {
      searchLocation.value = ""
      if (res.error) {
        locationText.className = "error"
        locationText.textContent = res.error
      } else {
        locationText.className = "success"
        weatherText.className = "weather-data"

        locationText.textContent = res.location
        weatherText.textContent = `Current temperature is ${res.temperature}.\r\n\r\nHowever, it feels like it's ${res.feelsLike}.\r\n\r\nWind Speed: ${res.windSpeed}, \r\n\r\nPressure: ${res.pressure},\r\n\r\nHumidity: ${res.humidity}`
      }
    })
})
