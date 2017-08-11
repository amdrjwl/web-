const express=require('express')
const router=express()
const db=require('../models/db.js')


exports.getsinger=function(req,res,next){
	db.find('singer',{},function(err,result){
		res.json(result)
	})
}
