const express = require("express")
const port = process.env.PORT || 3090
require("./db/mongoose")

// Router
const userRouter = require("./Router/userRouter")
const taskRouter = require("./Router/taskRouter")

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log("server started at", port)
})
