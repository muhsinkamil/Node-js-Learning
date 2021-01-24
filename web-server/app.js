const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(3090, () => {
    console.log("server listening at port 3090")
})
