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

  var sqlQuery = "INSERT INTO `repIllnesses` (`venudID`, `address`, `city`) VALUES \
  ('"+request.body.venueID+"', '"+request.body.address+"', '"+request.body.city+"')";

  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("addRepIllness result: ", result, fields);


    var sqlQuery = "INSERT INTO `repSymptoms` (`repIllnessID`, `bodyLocation`, `Symptom1`, `Stmptom2`) VALUES \
    ("+result.insertId+", 'head', "+request.body.hSymptom1+", "+request.body.hSymptom2+")";
    //var sqlQuery = "SELECT * FROM repIllnesses WHERE repIllnessID = '" + result.insertId + "'"
    console.log(sqlQuery)
    con.query(sqlQuery, function (err, result, fields) {
      if (err) {
        throw err;
        return;
      }
      console.log("Post add SELECT:", result);

      response.json({
        status: 'success',
        type: result,
        longitude: request.body.lon,
        latitude: request.body.lat
      });
    });
  });
});

app.post('/getRepillnesses', (request, response) => {
  console.log("get Rep Illnesses Body", request.body);
  
    var sqlQuery = "SELECT * FROM repIllnesses"
    console.log(sqlQuery)
    con.query(sqlQuery, function (err, result, fields) {
      if (err) {
        throw err;
        return;
      }
      console.log("Post SELECT:", result.RowDataPacket);
  
  
      response.json({
        status: 'success',
        type: result
      });
  });
});


app.post('/getUserInfo', (request, response) => {
  console.log("get userInfo", request.body);
  
    var sqlQuery = "SELECT * FROM userInfo WHERE isUserInfo= '" + request.body.userID + "'"
    console.log(sqlQuery)
    con.query(sqlQuery, function (err, result, fields) {
      if (err) {
        throw err;
        return;
      }
      console.log("Post request userInfo:", result.RowDataPacket);
  
  
      response.json({
        status: 'success',
        userInfo: result
      });
  });
});
 
app.post('/addUserInfo', (request, response) => {
  console.log("add userInfo", request.body);
  
  var sqlQuery = "INSERT INTO `userInfo` (`name`, `StreetAddress`, `city`, `state', `zipcode') VALUES \
  ('"+request.body.name+"', '"+request.body.streetAddress+"', '"+request.body.city+"', '"+request.body.state+"', '"+request.body.zipcode+"')";

    console.log(sqlQuery)
    con.query(sqlQuery, function (err, result, fields) {
      if (err) {
        throw err;
        return;
      }
      console.log("Post add userInfo:", result.RowDataPacket);
  
      response.json({
        status: 'success',
        userInfo: result
      });
  });
});