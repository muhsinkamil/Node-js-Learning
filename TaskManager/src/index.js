const express = require("express")
const Task = require("./db/models/Task")
const User = require("./db/models/User")
const port = process.env.PORT || 3090
require("./db/mongoose")

const app = express()

app.use(express.json())

// CREATE
app.post("/users", (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then((user) => res.status(201).send(user))
    .catch((e) => {
      res.status(400).send(e)
    })
})

app.post("/tasks", (req, res) => {
  const task = new Task(req.body)

  task
    .save()
    .then((task) => res.status(201).send(task))
    .catch((e) => {
      res.status(400).send(e)
    })
})

// READ
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => res.status(500).send(e))
})

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }

      res.send(user)
    })
    .catch((e) => res.status(500).send(e))
})

app.listen(port, () => {
  console.log("server started at", port)
})
