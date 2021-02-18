const express = require("express")
const router = new express.Router()
const bcrypt = require("bcrypt")
const User = require("../db/models/User")

// CREATE USER / SIGNUP
router.post("/users/signup", async (req, res) => {
  const user = new User(req.body)

  try {
    const newUser = await user.save()
    res.status(201).send(newUser)
  } catch (e) {
    res.status(400).send(e)
  }
})

// READ
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send()
  }
})

router.get("/users/:id", async (req, res) => {
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

// UPDATE
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "age", "email", "password"]

  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send("Invalid Update")
  }

  try {
    // since findByIdAndUpdate bypasses the middleware, change to findById.
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).send("User not found")
    }

    // dynamically update the properties
    updates.forEach((update) => (user[update] = req.body[update]))

    // save the changed user
    await user.save()

    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// DELETE

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// login
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findByCredentials(email, password)
    res.send(user)
  } catch (e) {
    res.status(404).send(e)
  }
})

module.exports = router
