// const axios = require("axios");
// const $ = require("jquery");
// var jsdom = require('jsdom');
// $ = require('jquery')(new jsdom.JSDOM().window);


// Dependencies
// =============================================================

const fs = require("fs");
const path = require("path");
const http = require("http");
const uuidv4 = require('uuid/v4');
const express = require("express");
const db = require("./db/db.json");

// Tried using this require to pull a variable from the index.js file... didn't work.
// const index = require("./public/assets/js/index.js");





// Set up Express App & Server
// =============================================================
var app = express();
var PORT = process.env.PORT || 7777 ;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.listen(PORT, function () {

    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});





// Routes ******************
// =============================================================

// Basic route that sends the user first to the AJAX Page index.html
app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// Send user to notes.html from index.html "Get Started" button
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// I think this pulls the db.json info and puts it into the sidebar?????
// Not super sure but we definitely need this.
app.get("/api/notes", function (req, res) {
    res.json(db);
});



// Saves notes in sidebar, gives them a uniqueID & 
// calls them onto page when clicked in sidebar.  
app.post("/api/notes", function (req, res) {

    // This gives the new note a unique ID
    id = uuidv4();
    req.body.id = id;

    // This pushes the new note to the sidebar
    db.push(req.body);
    res.json(true);

    // Next few steps push the new note into db.json file :)
    // Read db.json file. Turn it into var "database".
    let database = fs.readFileSync("./db/db.json", "utf-8");

    // Turn JSON "database" string into an array
    let array = JSON.parse(database);
    let note = (req.body);

    // Append "note" object to JS "array"
    array.push(note);

    // Stringify "array" so we can write/send it back to db.json
    array = JSON.stringify(array);

    // Write'ing back to db.json
    fs.writeFileSync("./db/db.json",array,"utf-8");

});





// Next few steps DELETE from sidebar notes
app.delete("/api/notes/:id", function(req, res) {

    // Create and onClick event and pull the ID from the clicked item.            <<<<<<<----------------Continue from here in the morning.
    let idToDelete = req.params.id;
    
    
    // Read db.json file. Turn it into var "database".
    let database = fs.readFileSync("./db/db.json", "utf-8");
    console.log(database);

    // Turn JSON "database" string into an object with the variable name of array which is misleading.
    let array = JSON.parse(database);
    
    
    for (var i = 0; i < array.length; i++) {
if (array[i].id === idToDelete) {
    console.log("Found item to delete")
    array.splice(i,1)
}
    }
    console.log(idToDelete);
    console.log(database);
    
   // Stringify "array" so we can write/send it back to db.json
   array = JSON.stringify(array);

   // Write'ing back to db.json
   fs.writeFileSync("./db/db.json",array,"utf-8");

    
  });







  // ----------------------------------------------------------
  // Testing the code below
  
  
  /*
  


  // Next few steps DELETE from sidebar notes
app.delete("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
  


  */