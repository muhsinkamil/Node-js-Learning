const mongoose = require("mongoose")
const User = require("./models/User")
const Task = require("./models/Task")

mongoose.connect("mongodb://localhost:27017/task-manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const me = new User({
  name: "Kamil",
  age: "24",
  email: "mymail@ex.com",
})

me.save()
  .then(() => console.log("Saved"))
  .catch((e) => console.log("error", e))

// const buyMilk = new Task({})

// buyMilk
//   .save()
//   .then(() => console.log("Saved Task"))
//   .catch((e) => console.log("e", e))
