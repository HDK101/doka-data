const { app } = require("./config/config");

app.get("/", function(req, res) {
  res.send("Hello world!");
});
