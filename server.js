const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.static("static"));
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render(__dirname + "/static/index.html");
});

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
