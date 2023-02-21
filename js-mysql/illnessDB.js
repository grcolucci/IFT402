var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var addUserInfo = function () {
  console.log('addUser');
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}
var updateUserInfo = function () {
    console.log('I hear a scream!');
  }
  
//Assign the event handler to an event:
eventEmitter.on('addUser', addUserInfo);
eventEmitter.on('updateUser', updateUserInfo);

//Fire the 'scream' event:
eventEmitter.emit('addUser');
eventEmitter.emit('updateUser');