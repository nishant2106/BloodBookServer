var express = require("express");
const bodyParser = require("body-parser");
var authRouter = express.Router();
const cors = require("./cors");
var db = require("../models/mysql");

authRouter.use(bodyParser.json());
/* GET users listing. */
authRouter
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
  .post(cors.corsWithOptions, function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
      db.query(
        "SELECT * FROM Employee WHERE uname = ? AND password = ?;",
        [username, password],
        function (error, results, fields) {
          if (error) console.log(error);
          if (results.length > 0) {
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
          }
          // res.end();
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
  });
module.exports = authRouter;
