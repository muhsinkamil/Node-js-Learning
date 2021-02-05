const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()
const publicFolder = path.join(__dirname, "../public")
const viewsFolder = path.join(__dirname, "../templates/views")
const partialFolder = path.join(__dirname, "../templates/partials")

const port = process.env.PORT || 3090

const getLocation = require("../utils/getLocation")
const getCurrentWeather = require("../utils/getCurrentWeather")

// set up for rendering static files
app.use(express.static(publicFolder))

// set handlebar for Dynamic rendering
app.set("view engine", "hbs")
app.set("views", viewsFolder)
hbs.registerPartials(partialFolder)

// Home page rendered by views(index)
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Anytime",
    company: "Weather Anytime",
  })
})

// About page rendered by views(about)
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    company: "Weather Anytime",
  })
})

// Help page rendered by views(help)
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    subtitle: "FAQ",
    company: "Weather Anytime",
  })
})

app.get("/weather", (req, res) => {
  getLocation(req.query.location, (error, response) => {
    if (error) {
      return res.send({
        error,
      })
    }
    getCurrentWeather(response.lat, response.lon, (error, currentWeather) => {
      if (error) {
        return res.send({
          error,
        })
      }
      res.send({
        location: currentWeather.name,
        description: currentWeather.weather[0].description,
        temperature: currentWeather.main.temp,
        feelsLike: currentWeather.main.feels_like || "perfect",
        pressure: currentWeather.main.pressure,
        humidity: currentWeather.main.humidity,
        windSpeed: currentWeather.wind.speed,
      })
    })
  })
})

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "404 Help not found",
    errorMessage: "Help article not found",
    company: "Weather Anytime",
  })
})

// 404 page
app.get("*", (req, res) => {
  res.render("404Page", {
    title: "404Page",
    errorMessage: "Page not found",
    company: "Weather Anytime",
  })
})

app.listen(port, () => {
  console.log("server listening at port ", port)
})
