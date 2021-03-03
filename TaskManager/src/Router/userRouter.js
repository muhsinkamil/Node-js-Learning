const express = require("express")
const router = new express.Router()
const User = require("../db/models/User")
const { sendWelcomeMail, sendByeMail } = require("../emails/account")

const multer = require("multer")
const upload = multer({
  limits: {
    fileSize: 250_000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please provide a image"))
    }
    cb(undefined, true)
  },
})

const sharp = require("sharp")

// Middleware
const auth = require("../middleware/auth")

// CREATE USER / SIGNUP
router.post("/signup", async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateJWT()
    sendWelcomeMail(user.email, user.name)
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findByCredentials(email, password)

    const token = await user.generateJWT()
    res.send({ user, token })
  } catch (e) {
    res.status(404).send(e)
  }
})

//logout
router.post("/logout", auth, async (req, res) => {
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

//logout of all devices
router.post("/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

// READ
router.get("/me", auth, async (req, res) => {
  res.send(req.user)
})

// router.get("/:id", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

// UPDATE
router.patch("/me", auth, async (req, res) => {
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
    // const user = await User.findById(req.user._id)

    // if (!user) {
    //   res.status(404).send("User not found")
    // }

    // dynamically update the properties
    updates.forEach((update) => (req.user[update] = req.body[update]))

    // save the changed user
    await req.user.save()

    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

// DELETE
router.delete("/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)
    // if (!user) {
    //   return res.status(404).send()
    // }

    await req.user.remove()
    sendByeMail(req.user.email, req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send()
    }
    const buffer = await sharp(req.file.buffer)
      .resize(300, 300)
      .png()
      .toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send("success")
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

router.get("/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    }

    res.set("Content-Type", "image/png")
    res.send(user.avatar)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete("/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
