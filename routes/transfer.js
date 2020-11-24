var express = require('express');
const bodyParser = require('body-parser')
var transferRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

transferRouter.use(bodyParser.json())
/* GET users listing. */
transferRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from Transfer natural join Hospital;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const name= req.body.newNurse.name
    const email= req.body.newNurse.email
    const mobile= req.body.newNurse.mobile
    const gender= req.body.newNurse.gender
    const address= req.body.newNurse.address
    const joinDate= req.body.newNurse.joinDate
    console.log(req.body)
    const sqlInsert ="INSERT INTO Nurse(name,gender,city,mob_no,email,join_date)VALUES(?,?,?,?,?,?);"
    db.query(sqlInsert,[name,gender,address,mobile,email,joinDate],(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
        }
    })
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    const id='2'
    const sqlInsert ="delete from Transfer where t_id='?';"
    db.query(sqlInsert,[id],(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
        }
    })
})
transferRouter.route('/hospital')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,(req,res,next)=>{
    const sqlInsert ="select h_id,name from Hospital;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    }) 
})
module.exports = transferRouter;
