const express = require("express")
const router = new express.Router()
const Task = require("../db/models/Task")

// CREATE
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body)

  try {
    const newTask = await task.save()
    res.status(201).send(newTask)
  } catch (e) {
    res.status(500).send(e)
  }
})

// READ
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/tasks/:id", async (req, res) => {
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

// UPDATE
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]

  const isAllowed = updates.every((update) => allowedUpdates.includes(update))

  if (!isAllowed) {
    return res.status(400).send("Invalid update")
  }

  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => (task[update] = req.body[update]))

    await task.save()

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

// DELETE
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
