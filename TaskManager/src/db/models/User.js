require("dotenv").config()
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Task = require("./Task")

const userSchema = new mongoose.Schema(
  {
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
    // Tokens has a array of token that the user has on logging on multiple devices. Tokens has an array of objects. Each object has a prop called token which is a string and is required.
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
)

// Make a virtual field that associate with task
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
})

// hiding private info when sending back the response
userSchema.methods.toJSON = function () {
  const { password, tokens, avatar, ...rest } = this.toObject()

  // delete user.password
  // delete user.tokens
  // delete user.avatar

  return rest
}

// Issue jwt
userSchema.methods.generateJWT = async function () {
  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3 days" }
  )

  this.tokens = this.tokens.concat({ token })
  await this.save()

  return token
}

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
  // console.log("running middleware")

  // console.log(this.isModified("password"))

  if (this.isModified("password")) {
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

// deletes user tasks when the user is removed.
userSchema.pre("remove", async function (next) {
  await Task.deleteMany({ owner: this._id })

  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
