const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

let rawdata = fs.readFileSync("story.json");
let student = JSON.parse(rawdata);
console.log(student);

app.use(express.static("public"));
app.use("/stylesheets", express.static(__dirname + "public/stylesheets"));
app.use("/scripts", express.static(__dirname + "public/script"));

app.get("", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => console.info(`Listening on port ${port}`));

