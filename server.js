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

