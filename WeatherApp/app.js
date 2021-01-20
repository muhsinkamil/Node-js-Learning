const axios = require("axios")

console.log("This is weather app")

const getUsers = async () => {
  const { data: users } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  )
  console.log(users)
}

getUsers()
