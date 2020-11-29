var express = require('express');
const bodyParser = require('body-parser')
var nurseRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

nurseRouter.use(bodyParser.json())
/* GET users listing. */
nurseRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    console.log(req.session)
    if(req.session.loggedin){
        const sqlInsert ="select * from Nurse;"
        db.query(sqlInsert,(err,result)=>{
            res.send(result)
        })
    }
    else{
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    }
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
    const sqlInsert ="delete from Nurse where nurse_id='?';;"
    db.query(sqlInsert,[id],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})
nurseRouter.route('/check_nurse_email')
.options(cors.corsWithOptions)
.get(cors.corsWithOptions,(req,res,next)=>{
    // const email = 'riyajoshi@gmail.com'
    const email = req.body.email
    const sqlExists ="select nurse_id from Nurse where email=?;"
    db.query(sqlExists,[email],(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
        }
        else{
            res.statusCode = 203;
            res.setHeader('Content-Type', 'text/plain');
        }
    })
})
module.exports = nurseRouter;
