/*
  Creating basic node servers:

  with different urls from req.url I can conditional render

  the url module allows me to break urls into query strings:

      http.createServer((req, res)=>{
        console.log("The server is running");
        res.writeHead(200, {'Content-Type' : 'text/html'});
        var q = url.parse(req.url,true).query
        var dates = q.year;
        res.write(dates);
        res.end()
      }).listen(8080)

*/

// this is the most basic pure node server:
var http = require("http");
var url = require("url");
var fs = require("fs");
const PORT = procces.env.PORT || 5000;

http
  .createServer((req, res) => {
    // parse the url for params
    var q = url.parse(req.url, true);

    // make a dynamic switch for each file name
    var filename = "." + q.pathname;
    console.log(filename);
    if (filename == "./") {
      filename = "index.html";
    }
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        console.error(err);
        return res.end("404 not found, please add a page name we have");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      console.log("incoming request at " + req.url);
      return res.end();
    });
  })
  .listen(PORT);

console.log(`My node server is running on port ${port}`);
