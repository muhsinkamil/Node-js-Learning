const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 1,
    validate(value) {
      if (value <= 0) {
        throw new Error("Age must be valid number")
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid")
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isLength(value, { min: 6 }) || value === "password") {
        throw new Error("Password is too weak")
      }
    },
  },
})

// Check if email and password is correct
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Email or password is not")
  }

  return user
}

// before saving hash the password
userSchema.pre("save", async function (next) {
  console.log("running middleware")

  console.log(this.isModified("password"))

  if (this.isModified("password")) {
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
