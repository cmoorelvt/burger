const orm = require("../config/orm.js");
const burger = {
	selectAll: function (cb) {
		orm.selectAll("burgers", function (res) {
			cb(res);
		});
	},
	insertOne: function (col1, val1, cb) {
		orm.insertOne("burgers", col1, val1, function (res) {
			cb(res);
		});
	},
	updateOne: function (col1, val1, id, idVal, cb) {
		orm.updateOne("burgers", col1, val1, id, idVal, function (res) {
			cb(res);
		});
	},
	deleteOne: function (col1, val1, cb) {
		orm.deleteOne("burgers", col1, val1, function (res) {
			cb(res);
		});
	},
};
module.exports = burger;