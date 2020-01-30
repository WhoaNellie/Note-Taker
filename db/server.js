// setting up server
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.static("../public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.listen(PORT, function () {
    console.log("Note Taker listening on PORT: " + PORT);
});


// API request handling
const fs = require("fs");
let dataBase = JSON.parse(fs.readFileSync("./db.json"));
console.log(dataBase[0]);

app.get("/api/notes", function (req, res) {
    console.log(dataBase);
    console.log(typeof dataBase);
    res.json(dataBase);
});

app.post("/api/notes", function(req, res) {
    console.log("post");
    console.log(typeof req);
    console.log(req.body);

    dataBase.push(req.body);
    console.log(dataBase);
    fs.writeFileSync("./db.json", JSON.stringify(dataBase));
  });

// setting html routes
const path = require("path");

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve("../public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.resolve("../public/index.html"));
});