// DEPENDENCIES ============================================================================================
const express = require("express");
const fs = require("fs");
const path = require("path");

// SERVER SETUP ============================================================================================
const app = express();
const PORT = process.env.PORT || 3000;

// DATA HANDLING ===========================================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES ==================================================================================================

//----- Sets landing page as index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//----- Sets notes page as notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// FUNCTIONALITY ===========================================================================================

app.post("/api/notes", function (req, res) {
  //reads data from db.json
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, notes) {
    if (err) throw err;
    notes = JSON.parse(notes);
    let id = notes[notes.length - 1].id + 1;
    let newNote = { title: req.body.title, text: req.body.text, id: id };
    let activeNote = notes.concat(newNote);
    //writes data to db.json
    fs.writeFile(
      __dirname + "/db/db.json",
      JSON.stringify(activeNote),
      function (err, data) {
        if (err) throw err;
        console.log(activeNote);
        res.json(activeNote);
      }
    );
  });
});

app.get("/api/notes", function (req, res) {
  //pulls data from db.js
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

//Still working on this. Delete button does not currently work.
app.delete("/api/notes/:id", function (req, res) {
  const noteID = JSON.parse(req.params.id);
  console.log(noteID);
  fs.readFile(__dirname + "db/db.json", "utf8", function (err, notes) {
    if (err) throw err;
    notes = JSON.parse(notes);
    notes = notes.filter((val) => val.id !== noteID);
    fs.writeFile(
      __dirname + "/db/db.json",
      JSON.stringify(notes),
      function (err, data) {
        if (err) throw err;
        res.json(notes);
      }
    );
  });
});

app.put("api/notes/:id", function (req, res) {
  //-----Grabs notes from db.json
  const noteID = JSON.parse(req.params.id);
  fs.readFile(__dirname + "db/db.json", "utf8", function (err, notes) {
    if (err) throw err;
    notes.JSON.parse(notes);
    notes = notes.filter((val) => val.id !== noteID);
    //-----Writes notes to db.json
    fs.writeFile(
      __dirname + "db/db.json",
      JSON.stringify(notes),
      function (err, data) {
        if (err) throw err;
        res.json(notes);
      }
    );
  });
});
// SERVER LISTENER =========================================================================================
app.listen(PORT, () =>
  //-----Console log left for convenience of local use
  console.log(`App listening on PORT http://localhost:${PORT}`)
);
