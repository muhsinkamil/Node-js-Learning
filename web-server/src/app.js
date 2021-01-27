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

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mohamed Muhsin",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Information by Help page",
  })
})

app.get("/weather", (req, res) => {
  res.send({
    forecast: "cloudy",
    location: "London",
  })
})

app.listen(3090, () => {
  console.log("server listening at port 3090")
})
