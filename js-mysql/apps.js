const {apiMountFactory} = require('api-mount-server')
var cors = require('cors')
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "Georges-iMac.home",
    user: "illness",
    password: "DBFaster",
    database: "illness"
});

connection.connect((error) => {
  if(error){
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully');
});
connection.end((error) => {
});



 
const ApiMount = apiMountFactory({
  beforeListen: app => app.use(cors()),
})
 
const api = {
  test : () => 'works!',
}
 
ApiMount.exposeApi(api)