var mysql = require('mysql');

var con = mysql.createConnection({
  host: "Georges-iMac.home",
  user: "illness",
  password: "DBFaster",
  database: "illness"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM venuetypes", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(result[1].type);
    });
  });