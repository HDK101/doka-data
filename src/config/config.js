const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const app = express();

app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.listen(80, function(err) {
  if (err) console.error(err);
  console.log("Server initialized!");
});

module.exports = { app };
