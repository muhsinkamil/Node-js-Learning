const express = require("express")
const router = new express.Router()
const Task = require("../db/models/Task")
const auth = require("../middleware/auth")

// CREATE
router.post("/", auth, async (req, res) => {
  // const task = new Task(req.body)

  const task = new Task({
    ...req.body,
    owner: req.user,
  })

  try {
    const newTask = await task.save()
    res.status(201).send(newTask)
  } catch (e) {
    res.status(500).send(e)
  }
})

// READ
// Filter: completed = true
// Queries: ?limit={num}  skip={num}
// sorting: sortBy=createdAt:asc

router.get("/", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id })
    // res.send(tasks)
    const match = {}
    const sort = {}

    const options = {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
    }

    if (req.query.completed) {
      match["completed"] = req.query.completed === "true"
    }

    if (req.query.sortBy) {
      const [key, val] = req.query.sortBy.split("_")
      sort[key] = val === "asc" ? 1 : -1
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    })
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

// UPDATE
router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", "completed"]

  const isAllowed = updates.every((update) => allowedUpdates.includes(update))

  if (!isAllowed) {
    return res.status(400).send("Invalid update")
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

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
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
