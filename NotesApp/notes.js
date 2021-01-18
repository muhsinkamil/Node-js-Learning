const fs = require("fs")
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicates = notes.filter((note) => {
    return note.title === title
  })

  if (duplicates.length) {
    console.log("Duplicate Title. Try different title")
  } else {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse("Added Note"))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()

  const newNotes = notes.filter(note => {
      return note.title !== title
  })

  if(newNotes.length === notes.length){
      console.log(chalk.blue.inverse("Note not found to remove"))
  }else{
      saveNotes(newNotes)
      console.log(chalk.red.inverse("Removed Note"))
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json")
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes))
}

module.exports = { addNote, removeNote }
