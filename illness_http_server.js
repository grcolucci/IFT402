var http = require('http');
const StringDecoder = require('string_decoder').StringDecoder
const util = require('util')
const url = require('url')
const formidable = require('formidable')
var fs = require('fs');
var mysql = require('mysql');

// Create a DB connection with login info
var con = mysql.createConnection({
  host: "Georges-iMac.home",
  user: "illness",
  password: "DBFaster",
  database: "illness"
});

// Connect to the DB
con.connect(function(err) {
  if (err) {
    throw err;
    return;
  }
  console.log("Connected!");
  });

// Add a new record for the UserInfo table (a new user)
function addUserInfo(req, res) {
    console.log("Adding UserInfo Rec");
    con.query("INSERT INTO UserInfo" +
        " (`name`, `streetAddr`, `city`, `state`, `zipcode`,`countrycode`) " +
        "VALUES ('Glenn', '43412 Countrywalk Ct', 'Ashburn', 'VA', '20147', 'USA')",
        function(err, result, fields) {
          if (err) {
            throw err;
            return;
          }
          console.log("USer Added!");
          //console.log(result[1].type)}
        });
}

//create a server object:
const server = http.createServer(function (req, res) {
  let path = url.parse(req.url, true);
    if (req.method.toLowerCase() == 'post') {
      console.log("Post Recieved")

      let form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
      if(err){
        
        console.error(err.message);
        return;
      }
      console.log(fields, files)
      res.writeHead(200, "Ok", {'Content-Type' : 'text/plain'} )
      res.write('The post response\n\n\n');
      res.end(util.inspect({fields:fields, files:files}));
      })
    } else if (req.method.toLowerCase() == 'get') {
      console.log("Get Received")
      console.log(path
        )
      //res.writeHead(200, "Ok", {'Content-Type' : 'text/plain'} )
      //res.write('The get response\n\n\n');
      //res.write(util.inspect(path.query, "\n\n"))
      //res.end("end of browser message");

      
      addUserInfo(req, res);

      // Open and present the requested HTML file
      var filename = "." + path.pathname;
      fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();

    });
   } else {
      console.log(req.url)
      res.write('Hello World!'); //write a response to the client
      res.end(); //end the response
    }
// Set the listener
}).listen(8080, function() {
    console.log("Listening on port 8080")
}); //the server object listens on port 8080