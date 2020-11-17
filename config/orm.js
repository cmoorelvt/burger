const { query } = require("express");
const connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  
  function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
  }
  
const orm = {
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM ?? " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },

    insertOne: function(table, col1, val1, cb) {
      var queryString = "INSERT INTO " + table;
      queryString += " (";
      queryString += col1.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(val1.length);
      queryString += ") ";
      console.log(queryString);
      connection.query(queryString, val1, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },


    updateOne: function (table, col1, val1, id, idVal, cb) {
      connection.query(
        "UPDATE ?? SET ?? = ? WHERE ?? = ?",
        [table, col1, val1, id, idVal],
        function (err, result) {
          if (err) throw err;
          cb(result);
        }
      );
    },

    deleteOne: function (table, col1, val1, cb) {
      connection.query(
        "DELETE FROM ?? WHERE ?? = ?",
        [table, col1, val1],
        function (err, result) {
          if (err) throw err;
          cb(result);
        }
      );
    },
  };

module.exports = orm;