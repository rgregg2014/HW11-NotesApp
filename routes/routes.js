// DEPENDENCIES =======================================================================================
const fs = require("fs");
const path = require("path");

// EXPORT FUNCTION =====================================================================================
module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    //API routes ======================================================================================
    //-----read db.json and retun saved notes
    app.get("/api/notes", function (req, res) {
      res.JSON(notes);
    });
    //-----receives new note with an id, adds it to db.json, returns
    app.post("/api/notes/:id", function (req, res) {
      res.JSON(notes[req.params.id]);
    });
    //-----deletes note with an id
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log("Note deleted");
    });
    //------displays notes.html @ /notes
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    //-----displays index.html as default
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    //-----updates db.json whenever a note is added or deleted
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
  console.log("Export working!");
};
