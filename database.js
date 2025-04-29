const mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,   
  database: process.env.DB_NAME, 
  user: process.env.DB_USER,   
  password: process.env.DB_PASS
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
