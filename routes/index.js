var express = require("express");
const app = require("../app");
var router = express.Router();
const db = require("../models/mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
