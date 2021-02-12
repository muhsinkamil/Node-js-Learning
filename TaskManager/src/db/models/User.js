const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    validate(value) {
      if (value <= 0) {
        throw new Error("Age must be valid number")
      }
    },
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid")
      }
    },
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
