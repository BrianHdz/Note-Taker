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

    // This gives the new note a unique ID
    id = uuidv4();
    req.body.id = id;

    // This pushes the new note to the sidebar
    db.push(req.body);
    res.json(true);
    // console.log(req.body);

    // The next few steps will push the new note into the db.json file
    // This will read the db.json file and turn it into var database.
    let database = fs.readFileSync("./db/db.json", "utf-8");

    //this turns the JSON string into a JS array
    let array = JSON.parse(database);
    let note = (req.body);
    //console.log(array);
    //console.log(note);

    // appending "note" object to the JS "array"
    array.push(note);
    //console.log(array);

    // Stringify "array" so we can write/send it back to db.json
    array = JSON.stringify(array);
    console.log(array);

    // write'ing back to db.json
    fs.writeFileSync("./db/db.json",array,"utf-8");

});




// fs.appendFile("./db/db.json", req.body, function (err) {

//     if (err) {
//         return console.log(err);
//     }

//     console.log("Success!");

// });
// ----------------------------------------------------
//this turns the JSON string into a JS array
// let array = JSON.parse(database);
// let note = (req.body);
// console.log(array);
// console.log(note);

// // appending my object to the JS newArray
// // let newArray = 
// array.push(note);
// console.log(array);

//--------------------------------------------------------
// This will read the db.json file and turn it into var database.
// let database = fs.readFileSync("./db/db.json", "utf-8");
// console.log(database);

// //Then we take the new note and turn that into variable "note"
// let note = (req.body);
// console.log(note);

// // Push "note" into "database"
// database.push();
// console.log(newData);

// // Turn the JSON string into a JS array
// let array = JSON.parse(newData);

// console.log(array);