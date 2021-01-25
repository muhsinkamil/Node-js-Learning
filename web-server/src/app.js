const path = require('path')
const express = require("express")

const app = express()
const publicFolder = path.join(__dirname, '../public')

// goes to the public folder and serves the files
app.use(express.static(publicFolder))

app.get("/weather" ,(req, res) => {
  res.send({
    forecast: "cloudy",
    location: "London"
  })
})

app.listen(3090, () => {
  console.log("server listening at port 3090")
})