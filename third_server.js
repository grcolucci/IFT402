const express = require('express');
const app = express();
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


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
  console.log("Body", request.body);
  con.query("SELECT * FROM VenueTypes", function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log(result, result[2].type);

    response.json({
      status: 'success',
      type: result,
      longitude: request.body.lon,
      latitude: request.body.lat
    });
  });
 
});

app.post('/addRepillness', (request, response) => {
  console.log("Add Rep Illness Body", request.body);

  /* var sqlQuery = "INSERT INTO illness.repIllnesses (`venudID`, `address`,`city`, \
  `state`,`zipcode`) VALUES  (", request.body.venueID, request.body.address, \
  request.body.venueID.city, request.body.venueID.state, request.body.venueID.zipCode, \
  request.body.venueID.repDate, ")"
 */
  var sqlQuery = "INSERT INTO `repIllnesses` (`venudID`, `address`) VALUES ('"+request.body.venueID+"','"+request.body.address+"')";

  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("addRepIllness result: ", result, fields);

  

    var sqlQuery = "SELECT * FROM repIllnesses WHERE repIllnessID = '" + result.insertId + "'"
    console.log(sqlQuery)
    con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Post add SELECT:", result);
  });

});

    response.json({
      status: 'success',
      type: result,
      longitude: request.body.lon,
      latitude: request.body.lat
    });
  });
 