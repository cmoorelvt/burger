const express = require("express");
const burger = require("../models/burger.js");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
	burger.selectAll(function (data) {
		let hbsObject = {
			burgers: data,
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/api/burgers", function (req, res) {
	burger.insertOne(["burger_name"], [req.body.name], function (result) {
		// Send back the ID of the new quote
		res.json({ id: result.insertId });
	});
});

router.put("/api/burgers/:id", function (req, res) {
	let id = "id";
	let idVal = req.params.id;
	burger.updateOne("devoured", true, id, idVal, function (result) {
		if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		}
		res.status(200).end();
	});
});

router.delete("/api/burgers/:id", function (req, res) {
	let col1 = "id";
	let val1 = req.params.id;
	console.log(val1);
	burger.deleteOne(col1, val1, function (result) {
		console.log(result);
		if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
			res.status(404).end();
		}
		res.status(200).end();
	});
});

// export the router
module.exports = router;