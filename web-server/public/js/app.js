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

        weatherText.innerHTML = `<b style='color:rgb(214, 37, 132)'>Current temperature</b> is ${res.temperature}.However, it feels like it's ${res.feelsLike}.<b style='color:rgb(214, 37, 132)'>With Wind Speed</b> of ${res.windSpeed} km/h, <b style='color:rgb(214, 37, 132)'>Pressure</b> ${res.pressure} mb,and has <b style='color:rgb(214, 37, 132)'>Humidity</b> ${res.humidity} %`
      }
    })
})
