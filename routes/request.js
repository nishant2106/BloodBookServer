var express = require("express");
const bodyParser = require("body-parser");
var requestRouter = express.Router();
const cors = require("./cors");
var db = require("../models/mysql");

requestRouter.use(bodyParser.json());
/* GET users listing. */
requestRouter
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
  });
requestRouter
  .route("/:address/:blood_grp")
  .options(cors.corsWithOptions)
  .get(cors.corsWithOptions, (req, res, next) => {
    const district = req.params.address;
    const blood_grp = req.params.blood_grp;
    console.log(req.params);
    const sqlExists = "select * from Donor where district=? and blood_grp=?;";
    db.query(sqlExists, [district, blood_grp], (err, result) => {
      if (err) {
        console.log(err);
      }
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
      } else {
        res.statusCode = 203;
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "PUT, POST, GET, DELETE, PATCH, OPTIONS"
        );
      }
    });
  });
module.exports = requestRouter;
