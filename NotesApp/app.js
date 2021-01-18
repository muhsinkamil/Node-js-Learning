const yargs = require("yargs")
const { addNote, removeNote } = require('./notes')

// console.log(process.argv)
// console.log(yargs.argv)

// create note
yargs.command({
    command: "add",
    describe: "adding notes",
    builder: {
        title: {
            describe: "Title",
            type: "string",
            demandOption: true
        },
        body: {
            describe: "Body",
            type: "string",
            demandOption: true
        }
    },
    handler: function(argv){
        addNote(argv.title, argv.body)
    }
})

// remove note
yargs.command({
    command: "remove",
    describe: "removing note",
    builder: {
        title: {
            describe: "remove note",
            type: 'string',
            demandOption: true
        }
    },
    handler: function(argv){
        removeNote(argv.title)
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