var mysql = require('mysql');

var con = mysql.createConnection({
  host: "Georges-iMac.home",
  user: "illness",
  password: "DBFaster",
  database: "illness"
});

con.connect(function(err) {
    if (err) {
      throw err;
      return;
    }
    console.log("Connected!");

  });
 // console.log(con)
con.query("SELECT * FROM VenueTypes WHERE idVenueTypes=1", function (err, result, fields) {
  if (err) {
    throw err;
    return;
  }
  console.log(result);
});

  con.query("SELECT * FROM USerInfo", function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log(result);
 // console.log(result[1].type);
});
  
 