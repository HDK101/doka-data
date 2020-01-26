const { app } = require("./config/config");
const { readdir, access, lstat } = require("fs");
const path = require("path");

const currentDirectory = path.resolve(`${__dirname}/../test/`);

app.get("/", function(req, res) {
  renderFolder("", res);
});

app.get("/file", function(req, res) {
  const filename = req.query.name;
  const currentFolder = req.cookies.folder + "/" + filename;
  const currentFile = `${currentDirectory}\\${currentFolder}`;


  console.log(req.cookies.folder);
  console.log(currentFile);

  lstat(currentFile, function(err, stats) {
    if (err) return res.send("File or directory doesn't exists");

    if (stats.isFile()) {
      res.download(currentFile, filename, { dotfiles: "allow" });
    } else if (stats.isDirectory()) {
      renderFolder(currentFolder, res);
    }
  });
});

/**
 * Get <a></a> html element template
 */

function renderFolder(folderPath, res) {
  htmlFiles = "";
  readdir(currentDirectory + "/" + folderPath, function(err, files) {
    if (err) console.error(err);

    let index = 0;
    const filesLength = files.length;

    for (index = 0; index < filesLength; index++) {
      htmlFiles += getATemplate(files[index]) + "<br>";
    }
    htmlFiles 
    res.cookie("folder", folderPath);
    res.send(htmlFiles);
  });
}

function getATemplate(value) {
  return `<a href="/file?name=${value}">${value}</a>`;
}
