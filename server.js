// Dependencies
const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

// Set up the Express app
const app = express();

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set up the port number
const PORT = process.env.PORT || 3001;

// Route handler for the GET /api/notes route
app.get('/api/notes', (req, res) => {
  // Read the db.json file
  const notesData = fs.readFileSync('./db/db.json', 'utf8');
  // Parse the JSON data
  const notes = JSON.parse(notesData);
  // Return the saved notes as JSON
  res.json(notes);
});

// Route handler for the POST /api/notes route
app.post('/api/notes', (req, res) => {
  // Read the db.json file
  const notesData = fs.readFileSync('./db/db.json', 'utf8');
  // Parse the JSON data
  const notes = JSON.parse(notesData);
  // Get the new note data from the request body
  const newNote = req.body;
  // Generate a unique id using the uuid package
  newNote.id = uuid.v4();
  // Add the new note to the array of saved notes
  notes.push(newNote);
  // Write the updated notes data to the db.json file
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  // Return the new note to the client as JSON
  res.json(newNote);
});