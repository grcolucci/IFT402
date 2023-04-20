const express = require('express');
const app = express();
var mysql = require('mysql');
const {
  TwitterApi
} = require('twitter-api-v2');

/* const client = new TwitterApi({
    appKey: process.env.APPKEY,
    appSecret: process.env.APPSECRET,
    accessToken: process.env.ACCESSTOKEN,
    accessSecret: process.env.ACCESSSECRET,
}); */

const bearer = new TwitterApi(process.env.BEARERTOKEN)
var tClient = require('twitter-api-v2')

console.log("Client", bearer)


/* const jsTweets = bearer.v2.search('JavaScript', { 'media.fields': 'url' });
console.log("JS", jsTweets)
// Consume every possible tweet of jsTweets (until rate limit is hit)
for (tweet of jsTweets) {
  console.log(tweet);
}
 */
// With default prefix
//const result = await client.v2.get('tweets/search/recent', { query: 'nodeJS', max_results: 100 });
/* const result = client.v2.get('tweets/search/recent', { query: 'nodeJS', max_results: 100 });
console.log("Twitter", result); // TweetV2[]

client.v2.search('search/tweets', {q: 'nodeJS'}, function(error, tweets, response) { 
  console.log("Error", error);
  console.log("Tweets", tweets);
  tweets.statuses.forEach(function(tweet) {
    console.log("tweet: " + tweet.text)
  });
}); */

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
  repDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  var sqlQuery = "INSERT INTO `repIllnesses` (`venudID`, `address`, `city`, `state`, `zipcode`, `repDate`) VALUES (" + request.body.venueID + ", '" + request.body.address + "', '" + request.body.city + "', '" + request.body.state + "', '" + request.body.zipCode + "','" + repDate + "')";
  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("addRepIllness result: ", result, fields);


    var sqlQuery = "INSERT INTO `repSymptoms` (`repIllnessID`, `bodyLocation`, `Symptom1`, `Symptom2`, `Symptom3`, `Symptom4`, `Symptom5`, `Symptom6`) VALUES \
    (" + result.insertId + ", '" + request.body.bodyLoc + "', " + request.body.hSymptom1 + ", " + request.body.hSymptom2 + ", " + request.body.hSymptom3 + ", " + request.body.hSymptom4 + ", " + request.body.hSymptom5 + ", " + request.body.hSymptom6 + ")";
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

  //var sqlQuery = "SELECT * FROM repIllnesses"
  var sqlQuery = "SELECT * FROM repIllnesses JOIN repSymptoms ON repIllnesses.repIllnessID=repSymptoms.repIllnessID"
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

  var sqlQuery = "SELECT UserInfo.idUserInfo, UserInfo.name AS uiName,  UserInfo.streetAddr AS uiStreet,  UserInfo.city AS uiCity," +
  " UserInfo.state AS uiState,  UserInfo.zipcode AS uiZipcode, UserLocations.idVenue AS ulIDVenue, "  +
    "UserInfo.city AS uiCity, Venues.city AS venCity , Venues.name AS venName, UserLocations.idUserLocations FROM UserInfo JOIN UserLocations ON Userinfo.idUserInfo=UserLocations.idUser " +
    "JOIN venues ON UserLocations.idVenue = Venues.idVenues WHERE idUserInfo=" + request.body.userID;
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

app.post('/getUserLocations', (request, response) => {
  console.log("get User Locations", request.body);

  var sqlQuery = "SELECT * FROM UserLocations WHERE idUser=" + request.body.userID
  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Post request userLocations:", result);
    response.json({
      status: 'success',
      userInfo: result
    });
  });
});

app.post('/addUserLocation', (request, response) => {
  console.log("add userLocation", request.body);

  var sqlQuery = "INSERT INTO `userLocations` (`idUser`, `idVenue`, `streetAddress`, `city`, `state`, `zipCode`) VALUES \
  ('" + request.body.userID + "', '" + request.body.venueID + "', '" + request.body.streetAddress + "', '" + request.body.city + "', '" + request.body.state + "', '" + request.body.zipCode + "')";

  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Post add userLocation:", result);

    response.json({
      status: 'success',
      userLocation: result
    });
  });
});

app.post('/delUserLocation', (request, response) => {
  console.log("del userLocation", request.body);

  var sqlQuery = "DELETE FROM userLocations WHERE idUserLocations='" + request.body.idUserLocations + "'";

  console.log(sqlQuery)
  con.query(sqlQuery, function (err, result, fields) {
    if (err) {
      throw err;
      return;
    }
    console.log("Post delte userLocation:", result);

    response.json({
      status: 'success',
      userLocation: result
    });
  });
});