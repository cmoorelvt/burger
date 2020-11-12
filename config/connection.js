const mysql = require("mysql");

const connectionProperties = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Uzumaki8!",
    database: "burger_DB"
}

const connection = mysql.createConnection(connectionProperties);
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
module.exports = connection;