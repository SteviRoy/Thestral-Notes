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

