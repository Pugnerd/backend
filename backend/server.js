const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
var fs = require('fs');
/* let adat = []
fs.readFile('data.json', function( err, data){ adat = JSON.parse( data.toString() )}) */

const PORT = 8000;

// default options
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(function (req, res, next) {
  console.log("request:", req.url, req.body, req.method, __dirname);
  next();
});

app.use("/form", express.static(__dirname + "./../frontend/index.html"));
app.use("/pub", express.static(__dirname + "./../frontend/public/"));





app.get("/ping", function (req, res) {
  console.log("request:", req.url, req.body, req.method, __dirname);
  res.send("pong" + __dirname);
});
app.get("/ping2", function (req, res) {
  res.send("pong2" + __dirname);
});



//form fogadasa
app.post("/kuldes", function (req, res) {
  let userfile;
  let uploadPath;
 // let username=req.body.username;
console.log('req.body=',req.body,'req.files=',req.files,'req.username=',req.body.username);


let adat = []
fs.readFile('data.json', function (err, data) {
  var json = JSON.parse(data);
  json.push({name : req.body.username});    
  fs.writeFile("data.json", JSON.stringify(json), function(err){
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
})


  if (!req.files || Object.keys(req.files).length === 0) {
    app.use("/form", express.static(__dirname + "./../frontend/index.html"));

    app.use("/pub", express.static(__dirname + "./../frontend/public/"));
    console.log("request:", req.url, req.body, req.method, __dirname);
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  userfile = req.files.userfile;

  uploadPath = __dirname + "./../uploads/" + userfile.name;

  userfile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    // res.send("File uploaded to " + uploadPath);
  });
  console.log("vissza:", req.body)
  res.send(req.body)
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});