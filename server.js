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
  // Read the existing notes from the JSON file
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

  // Create a new note object with a unique ID
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  };

  // Add the new note to the array of notes
  notes.push(newNote);

  // Write the updated notes array back to the JSON file
  fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), err => {
    if (err) throw err;
    res.json(newNote);
  });
});

// Route handler for the DELETE /api/notes/:id route
app.delete('/api/notes/:id', (req, res) => {
  // Read the JSON file and parse its contents
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));

  // Remove the note with the specified ID
  const updatedNotes = notes.filter(note => note.id !== req.params.id);

  // Write the updated notes array to the JSON file
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes, null, 2));

  // Respond with a success status code and a message
  res.status(200).json({ message: 'Note deleted successfully' });
});

// Route handler for the GET /notes route
app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

// Route handler for the GET / route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
