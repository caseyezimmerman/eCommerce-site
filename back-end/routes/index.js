var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt-nodejs")
var mysql = require('mysql');
var config = require ('../config/config')
var connection = mysql.createConnection(config);
connection.connect();

router.post('/register',(req,res,next)=>{
	console.log(req.body)
	// going to insert data into 2 tables
	// users and customers
	// FIRST check to see if the user is in the database...
	// if they arent, put data into customers table first because we need cId in udera from customer table
	
	res.json(req.body)
	var name = req.body.name
	var phone = req.body.phone
	var email = req.body.email
	var password = req.body.password
	var hash = bcrypt.hashSync(password)
	var thePromise = new Promise((resolve, reject)=>{
		var insertQuery = `INSERT INTO users (name, phone, email, password) VALUES (?,?,?,?);`;
		connection.query(insertQuery,[name, phone, email, hash],(error)=>{
			if(error){
				reject(error)
			}else{
				resolve({msg: "success"})
			}
		})
	})

})

module.exports = router;
