const express = require('express');
const app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "Georges-iMac.home",
  user: "illness",
  password: "DBFaster",
  database: "illness"
});

con.connect(function (err) {
  if (err) {
    throw err;
    return;
  }
  console.log("Connected!");

});
// console.log(con)

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({
  limit: '1mb'
}));

app.post('/getVenues', (request, response) => {
  console.log("Request the list of venues", request.body);
  con.query("SELECT * FROM venues", function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Venues req results: ", result);

    response.json({
      status: 'success',
      venues: result,
    });
  });

});

app.post('/addRepillness', (request, response) => {
  console.log("Add Rep Illness Body", request.body);

  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  repDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

  var sqlQuery = "INSERT INTO `repIllnesses` (`venudID`, `address`, `city`, `state`, `zipcode`, `repDate`) VALUES (" + request.body.venueID + ", '" + request.body.address + "', '" + request.body.city + "', '" + request.body.state + "', '" + request.body.zipCode + "', '" + repDate + "')";
  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("addRepIllness result: ", result, fields);


    var sqlQuery = "INSERT INTO `repSymptoms` (`repIllnessID`, `bodyLocation`, `Symptom1`, `Stmptom2`) VALUES \
    (" + result.insertId + ", 'head', " + request.body.hSymptom1 + ", " + request.body.hSymptom2 + ")";
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
    console.log("Post SELECT:", result);

    response.json({
      status: 'success',
      type: result
    });
  });
});


app.post('/getUserInfo', (request, response) => {
  console.log("get userInfo", request.body);

  var sqlQuery = "SELECT * FROM UserInfo WHERE idUserInfo=" + request.body.userID
  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Post request userInfo:", result);
    response.json({
      status: 'success',
      userInfo: result
    });
  });
});

app.post('/addUserInfo', (request, response) => {
  console.log("add userInfo", request.body);

  var sqlQuery = "INSERT INTO `userInfo` (`name`, `streetAddr`, `city`, `state`, `zipCode`) VALUES \
  ('" + request.body.name + "', '" + request.body.streetAddr + "', '" + request.body.city + "', '" + request.body.state + "', '" + request.body.zipCode + "')";

  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Post add userInfo:", result);

    response.json({
      status: 'success',
      userInfo: result
    });
  });
});