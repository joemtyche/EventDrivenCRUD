const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'crudDatabase',
  user: 'root',
  password: ''
});

connection.connect(function(error){
  if(error){
    throw error;
  }
  else{
    console.log('Mysql DB is connected')
  }
});

module.exports = connection;