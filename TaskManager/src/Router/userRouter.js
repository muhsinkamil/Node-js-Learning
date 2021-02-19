const express = require("express")
const router = new express.Router()
const bcrypt = require("bcrypt")
const User = require("../db/models/User")

// Middleware
const auth = require("../middleware/auth")

// CREATE USER / SIGNUP
router.post("/users/signup", async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateJWT()

    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// login
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findByCredentials(email, password)

    const token = await user.generateJWT()
    res.send({ user, token })
  } catch (e) {
    res.status(404).send(e)
  }
})

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    )

    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

// READ
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user)
})

router.get("/users/:id", auth, async (req, res) => {
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
router.patch("/users/:id", auth, async (req, res) => {
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

router.delete("/users/:id", auth, async (req, res) => {
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

module.exports = router
