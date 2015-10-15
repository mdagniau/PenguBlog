var mysql = require('mysql');

var mySqlClient = mysql.createConnection({
  host     : "localhost",
  user     : "pengu",
  password : "pengu",
  database : "pengu"
});

