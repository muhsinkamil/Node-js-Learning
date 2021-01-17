const yargs = require("yargs")

// console.log(process.argv)
// console.log(yargs.argv)

// create note
yargs.command({
    command: "add",
    describe: "adding notes",
    handler: function(){
        console.log("adding note")
    }
})

// remove note
yargs.command({
    command: "remove",
    describe: "removing note",
    handler: function(){
        console.log("Removing note")
    }
})


// list notes
yargs.command({
    command: "list",
    describe: "listing notes",
    handler: function(){
        console.log("Listing notes")
    }})

// read notes
yargs.command({
    command: "read",
    describe: "Reading notes",
    handler: function(){
        console.log("Reading notes")
    }
})

yargs.parse()