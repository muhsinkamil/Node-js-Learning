require("dotenv").config()
const mongoose = require("mongoose")
// const User = require("./models/User")
// const Task = require("./models/Task")

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// const me = new User({
//   name: "Kamil",
//   age: "24",
//   email: "mymail@ex.com",
// })

// me.save()
//   .then(() => console.log("Saved"))
//   .catch((e) => console.log("error", e))

// const myUser = new User({
//   name: "Mohamed    ",
//   age: 21,
//   email: "mymailid@bayyinah.com",
//   password: "mymial    ",
// })

// myUser
//   .save()
//   .then(() => console.log("saved User"))
//   .catch((e) => console.log(e))

// const playJs = new Task({
//   description: "   play js     ",
// })

// playJs
//   .save()
//   .then(() => console.log("saved"))
//   .catch((e) => console.log("Error saving", e))
