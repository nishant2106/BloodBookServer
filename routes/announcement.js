var express = require('express');
const bodyParser = require('body-parser')
var announcementRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool
var session = require('express-session')

announcementRouter.use(bodyParser.json())
/* GET users listing. */
announcementRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const uname= session.uname
    const date = new Date()
    const sqlInsert ="select * from Donor;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const message= req.body.message
    const uname= req.session.uname
    const date = new Date()
    // const sqlInsert ="INSERT INTO Donor(aadhar_no,name,email,district,blood_grp,mob_no,gender,address,pinCode,isPlasmaDonor)VALUES(?,?,?,?,?,?,?,?,?,?);"
    // db.query(sqlInsert,[aadhar,name,email,district,blood,mobile,gender,address,pincode,plasma],(err,result)=>{
    //     console.log(result)
    //     if(err){
    //         console.log(err)
    //     }
    // })
})
module.exports = announcementRouter;
