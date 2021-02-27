const express = require("express")
const port = process.env.PORT || 3090
require("./db/mongoose")

// Router
const userRouter = require("./Router/userRouter")
const taskRouter = require("./Router/taskRouter")

const app = express()

// const multer = require("multer")
// const upload = multer({ dest: "avatar" })

// app.post("/avatar", upload.single("images"), (req, res) => {
//   res.send()
// })

const multer = require("multer")
const upload = multer({ dest: "avatars" })

app.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
  res.send()
})

app.use(express.json())
app.use("/users", userRouter)
app.use("/tasks", taskRouter)

app.listen(port, () => {
  console.log("server started at", port)
})
