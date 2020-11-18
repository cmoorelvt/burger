const { query } = require("express");
const connection = require("./connection.js");

function printQuestionMarks(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
}

const orm = {
	selectAll: function (table, cb) {
		connection.query("SELECT * FROM ??", [table], function (err, data) {
			if (err) throw err;
			cb(data);
		});
	},
	insertOne: function (table, col1, val1, cb) {
		let queryString = "INSERT INTO " + table;
		queryString += " (";
		queryString += col1.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(val1.length);
		queryString += ") ";
		console.log(queryString);
		connection.query(queryString, val1, function (err, result) {
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

// export the module for use in the controllers
module.exports = orm;