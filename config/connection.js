var mysql = require("mysql");

var connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Uzumaki8!",
    database: "burgers_DB"
}

var connection = mysql.createConnection(connectionProperties);
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
module.exports = connection;