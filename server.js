// setting up server
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.static("./public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.listen(PORT, function () {
    console.log("Note Taker listening on PORT: " + PORT);
});


// API request handling
const fs = require("fs");
let dataBase;

app.get("/api/notes", function (req, res) {
    dataBase = JSON.parse(fs.readFileSync("./db/db.json"));
    console.log(dataBase.length);
    console.log(dataBase);
    console.log(typeof dataBase);
    res.json(dataBase);
});

app.post("/api/notes", function(req, res) {
    console.log("post");
    console.log(typeof req);
    console.log(req.body);

    if(req.body.id){
        dataBase[req.body.id]= req.body;
    }else{
        req.body.id = dataBase.length;
        dataBase.push(req.body);
    }
    
    console.log(dataBase);
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase));
  });

app.delete("/api/notes/:id", function (req, res) {
    console.log("delete request");
    let noteId = req.params.id;
    // console.log(id);
    dataBase.splice(noteId,1);
    dataBase.map(function(x){
        if(x.id > noteId){
            x.id = x.id - 1;
        }
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(dataBase));
});

// setting html routes
const path = require("path");

app.get("/notes", function (req, res) {
    res.sendFile(path.resolve("./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.resolve("./public/index.html"));
});