var express = require('express');
const bodyParser = require('body-parser')
var donorRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

donorRouter.use(bodyParser.json())
/* GET users listing. */
donorRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="insert into Employee values(8,'admin','1234','Admin');"
    db.query(sqlInsert,(err,result)=>{
        res.send('Inserted')
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const aadhar= req.body.newDon.aadhar
    const name= req.body.newDon.name
    const email= req.body.newDon.email
    const mobile= req.body.newDon.mobile
    const district= req.body.newDon.district
    const blood = req.body.newDon.blood
    const gender= req.body.newDon.gender
    const address= req.body.newDon.address
    const pincode= req.body.newDon.pincode
    const plasma= req.body.newDon.plasma
    const sqlInsert ="INSERT INTO Donor(aadhar_no,name,email,district,blood_grp,mob_no,gender,address,pinCode,isPlasmaDonor)VALUES(?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert,[aadhar,name,email,district,blood,mobile,gender,address,pincode,plasma],(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
        }
    })
})
module.exports = donorRouter;
