// setting up server
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.listen(PORT, function () {
    console.log("Note Taker listening on PORT: " + PORT);
});


// setting html routes
const path = require("path");

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve("../public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.resolve("../public/index.html"));
});


