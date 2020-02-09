const fs = require("fs");
const db = require("./db/db.json");
const uuidv4 = require('uuid/v4');
// const axios = require("axios");
// // const $ = require("jquery");
// var jsdom = require('jsdom');
// $ = require('jquery')(new jsdom.JSDOM().window);




// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var http = require("http");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3333;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.listen(PORT, function () {

    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page index.html
app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// Link to get into notes.html from main button
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
   res.json(db); 
});

// Displays all notes in sidebar
app.post("/api/notes", function (req, res) {
    id = uuidv4();
    req.body.id = id;
    db.push(req.body);
    res.json(true);
    console.log(req.body);
});



//     var fs = require("fs");

// fs.appendFile("log.txt", process.argv[2], function(err) {

//   if (err) {
//     return console.log(err);
//   }

//   console.log("Success!");

// });
