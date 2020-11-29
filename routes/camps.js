var express = require('express');
const bodyParser = require('body-parser')
var campsRouter = express.Router();
const cors = require('./cors')
var db = require('../models/mysql').pool

campsRouter.use(bodyParser.json())
/* GET users listing. */
campsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.all(cors.corsWithOptions,(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(cors.corsWithOptions,(req,res,next) => {
    const sqlInsert ="select * from campaigns;"
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})
.post(cors.corsWithOptions,(req,res,next) => {
    const name= req.body.newCamp.name
    const mobile= req.body.newCamp.mobile
    const address= req.body.newCamp.address
    const cdate= req.body.newCamp.cdate
    const donationamt= req.body.newCamp.donationamt
    const sqlInsert ="INSERT INTO campaigns(name,c_date,location,mob_no,createdon)VALUES(?,?,?,?,?);"
    db.query(sqlInsert,[name,cdate,address,mobile,donationamt],(err,result)=>{
        console.log(result)
        if(err){
            console.log(err)
        }
    })
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    const id='2'
    const sqlInsert ="delete from campaigns where camp_id='?';;"
    db.query(sqlInsert,[id],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})


module.exports = campsRouter;
