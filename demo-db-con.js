var mysql = require('mysql');

var con = mysql.createConnection({
  host: "STAFF-229558",
  user: "root",
  password: "DBFaster1!"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});