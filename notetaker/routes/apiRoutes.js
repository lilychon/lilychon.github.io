var noteContents = require("../db/noteContents")

const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteContents);
    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        let lastId = noteContents[noteContents.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;

        console.log("Req.body:", req.body);
        noteContents.push(newNote);

        writeFileAsync("./db/noteContents.json", JSON.stringify(noteContents)).then(function () {
            console.log("Note has been updated");
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function (req, res) {
        let chosenId = parseInt(req.params.id);

        for (let i = 0; i < noteContents.length; i++) {
            if (chosenId === noteContents[i].id) {
                noteContents.splice(i, 1);

                let noteJSON = JSON.stringify(noteContents, null, 2);

                writeFileAsync("./db/noteContents.json", noteJSON).then(function () {
                    console.log("Note has been deleted");
                });
            }
        }
        res.json(noteContents);
    });
};

