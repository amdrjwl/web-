const express = require("express")
const router = express()
const db = require("../models/db.js")


exports.getsinger = function(req,res,next){
    //这个页面接收一个参数，页面

    db.find("singer",{},function(err,result){
        res.json(result);
    });
};