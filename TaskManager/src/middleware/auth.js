require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../db/models/User")

const auth = async (req, res, next) => {
  //console.log("Running middleware")
  try {
    const token = req.header("Authorization").replace("Bearer ", "")

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token })

    if (!user) {
      throw new Error()
    }

    req.user = user
    req.token = token

    next()
  } catch (e) {
    res.status(401).send({ error: "Invalid credentials" })
  }
}

module.exports = auth
