var express = require("express");
const bodyParser = require("body-parser");
var eventRouter = express.Router();
const cors = require("./cors");
var db = require("../models/mysql");

eventRouter.use(bodyParser.json());
/* GET users listing. */
/*get events. */
eventRouter
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
    const sqlInsert = "select * from event;";
    db.query(sqlInsert, (err, result) => {
      res.send(result);
    });
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    const title = req.body.title;
    const date = req.body.date;
    const color = req.body.color;
    const sqlInsert = "INSERT INTO event(title,date,color)VALUES(?,?,?);";
    db.query(sqlInsert, [title, date, color], (err, result) => {
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
      if (err) {
        console.log(err);
      }
    });
  });
module.exports = eventRouter;
