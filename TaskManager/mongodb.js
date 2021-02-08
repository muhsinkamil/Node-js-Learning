// CRUD operations
// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "taskdb"

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log("Error connecting to database")
    }

    const db = client.db(databaseName)

    // Create:

    // db.collection("users").insertMany([
    //   {
    //     name: "Kaja",
    //     age: 25,
    //   },
    //   {
    //     name: "Hussain",
    //     age: 25,
    //   },
    //   {
    //     name: "Ashiq",
    //   },
    // ])

    //     db.collection("users").insertOne(
    //       {
    //         name: "Abu",
    //         age: 40,
    //       },
    //       (error, result) => {
    //         if (error) {
    //           return console.log("Error inserting doc!!!")
    //         }
    //         return console.log("Inserted", result)
    //       }
    //     )
    //     console.log("Connected to database")

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Get Milk",
    //       completed: true,
    //     },
    //     {
    //       description: "Exercise",
    //       completed: false,
    //     },
    //     {
    //       description: "Learn something new",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Error inserting docs", error)
    //     }
    //     return console.log(result.ops)
    //   }
    // )

    // Query:

    // db.collection("tasks")
    //   .find({})
    //   .toArray((error, tasks) => {
    //     console.log(tasks)
    //   })

    // db.collection("tasks")
    //   .findOne({ _id: new ObjectID("60210e27bd70a430a45db269") })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error))

    // db.collection("tasks")
    //   .findOne({
    //     _id: new ObjectID("60210e27bd70a430a45db26b"),
    //   })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error))

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, result) => {
    //     if (error) {
    //       return console.log(error)
    //     }
    //     console.log(" ------ Getting unfinished tasks ---")
    //     console.log(result)
    //   })
  }
)
