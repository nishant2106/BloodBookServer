var express = require("express");
const bodyParser = require("body-parser");
var storageRouter = express.Router();
const cors = require("./cors");
var db = require("../models/mysql");

storageRouter.use(bodyParser.json());
/* GET users listing. */
storageRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .all(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    next();
  })
  .get(cors.corsWithOptions, (req, res, next) => {
    const sqlInsert = "select * from storage;";
    db.query(sqlInsert, (err, result) => {
      if (result) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "PUT, POST, GET, DELETE, PATCH, OPTIONS"
        );
        res.send(result);
      }
    });
  });
module.exports = storageRouter;
