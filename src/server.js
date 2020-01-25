const { app } = require("./config/config");
const { readdir, access } = require("fs");
const path = require("path");

const currentDirectory = path.resolve(`${__dirname}/../`);

console.log(process.argv);

app.get("/", function(req, res) {
  readdir(currentDirectory, function(err, files) {
    if (err) console.error(err);

    let htmlFiles = "";

    let index = 0;
    const filesLength = files.length;

    for (index = 0; index < filesLength; index++) {
      // htmlFiles += `${files[index]}<br>`;
      htmlFiles += getATemplate(files[index]) + "<br>";
    }

    res.send(htmlFiles);
  });
  //   res.send("Hello world!");
});

app.get("/file", function(req, res) {
  access("./" + req.query.name, function(err) {
    if (err) {
      return res.send("File doesn't exists");
    } else {
      console.log("File exists" + req.query.name);
      res.download(req.query.name);
      //   return res.send("File exists");
    }
  });
});

/**
 * Get <a></a> html element template
 */

function getATemplate(value) {
  return `<a href="/file?name=${value}">${value}</a>`;
}
