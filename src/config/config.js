const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: "true" }));
app.use(bodyparser.json());

app.listen(80, function(err) {
  if (err) console.error(err);
  console.log("Server initialized!");
});

module.exports = { app };
