const express = require("express")
const Task = require("./db/models/Task")
const User = require("./db/models/User")
const port = process.env.PORT || 3090
require("./db/mongoose")

const app = express()

app.use(express.json())

// CREATE
app.post("/users", async (req, res) => {
  const user = new User(req.body)

  try {
    const newUser = await user.save()
    res.status(201).send(newUser)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body)

  try {
    const newTask = await task.save()
    res.status(201).send(newTask)
  } catch (e) {
    res.status(500).send(e)
  }
})

// READ
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log("server started at", port)
})
