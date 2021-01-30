const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()
const publicFolder = path.join(__dirname, "../public")
const viewsFolder = path.join(__dirname, "../templates/views")
const partialFolder = path.join(__dirname, "../templates/partials")

// set up for rendering static files
app.use(express.static(publicFolder))

// set handlebar for Dynamic rendering
app.set("view engine", "hbs")
app.set("views", viewsFolder)
hbs.registerPartials(partialFolder)

// Home page rendered by views(index)
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    company: "Meteor",
  })
})

// About page rendered by views(about)
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    company: "Meteor",
  })
})

// Help page rendered by views(help)
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Information by Help page",
    company: "Meteor",
  })
})

app.get("/weather", (req, res) => {
  res.send({
    forecast: "cloudy",
    location: "London",
  })
})

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "404 Help not found",
    errorMessage: "Help article not found",
    company: "Meteor",
  })
})

// 404 page
app.get("*", (req, res) => {
  res.render("404Page", {
    title: "404Page",
    errorMessage: "Page not found",
    company: "Meteor",
  })
})

app.listen(3090, () => {
  console.log("server listening at port 3090")
})
