const fs = require("fs")
const chalk = require("chalk")

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find((note) => note.title === title)

  if (duplicateNote) {
    console.log(chalk.red.inverse("Duplicate Title. Try different title"))
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

  const newNotes = notes.filter((note) => {
    return note.title !== title
  })

  if (newNotes.length === notes.length) {
    console.log(chalk.blue.inverse("Note not found to remove"))
  } else {
    saveNotes(newNotes)
    console.log(chalk.red.inverse("Removed Note"))
  }
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.green.inverse("Your Notes"))

  notes.map((note, index) => {
    console.log(`${index + 1}) ${note.title}`)
  })
}

const readNote = (title) => {
  const notes = loadNotes()

  const requestedNote = notes.find((note) => note.title === title)

  if (!requestedNote) {
    console.log(chalk.red.inverse("No note found with title: ", title))
  } else {
    console.log(chalk.blue.inverse(requestedNote.title))
    console.log(requestedNote.body)
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

module.exports = { addNote, removeNote, listNotes, readNote }
