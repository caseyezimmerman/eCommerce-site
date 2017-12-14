var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require ('bcrypt-nodejs')
var config = require ('../config/config')
var connection = mysql.createConnection(config);
connection.connect();
var randToken = require('rand-token')
// console.log(randToken.uid(100))

router.post('/login',(req,res,next)=>{
	// res.json(req.body);
	console.log(req.body)
	var email = req.body.email
	var password = req.body.password

	var checkLoginQuery = `SELECT * FROM users WHERE email = ?;`;
	connection.query(checkLoginQuery,[email],(error,results)=>{
		if(error){
			throw error
		}
		if (results.length == 0){
			// this user does not exists
			res.json({
				msg:"badUser"
			})
		}else{
			// this email exists...see if password matches existing password
			//comparing the password of the user we selected based on email they entered
			// password is the password they just entered on the form to login
			// results[0].password is what we have for the current user in the database
			var checkHash = bcrypt.compareSync(password, results[0].password)
			if(checkHash){

			}else{
				// passwords do not match 
			}

		}
	})
})


router.post('/register',(req,res,next)=>{
	
	var name = req.body.name
	var phone = req.body.phone
	var email = req.body.email
	var password = req.body.password
	var city = req.body.city
	var state = req.body.state

	const checkEmail = new Promise((resolve, reject) =>{
	const checkEmailQuery = `SELECT * FROM users WHERE email = ?;`;
		connection.query(checkEmailQuery,[email],(error, results)=>{
			console.log(results)
			if (error) { 
				throw error; //for development
				// reject(error) //in production
			}else if(results.length > 0){
				// user exists already. goodbye.
				reject({
					msg: "userExists"
				})
			}else{
				// no error. no user. resolve (we dont care about results)
				resolve()
			}
		});
	})
	checkEmail.then(
		// code to run if our checkEmail resolves.
		()=>{
			console.log("User is not in the db.")
            const insertIntoCust = `INSERT INTO customers (customerName, city, state, salesRepEmployeeNumber) VALUES (?,?,?,?)`;
           	connection.query(insertIntoCust,[name, city, state, 1],(error, results)=>{
               	console.log(error)
               	if(error){

                	throw error;
               	}
               	// get the customer ID that was JUST inseterd (results)
               	const newID = results.insertId;
               	console.log(newID)
               	const token = randToken.uid(60);
               	var hash = bcrypt.hashSync(password)
	           	var insertQuery = `INSERT INTO users (name, cId, phone, email, password, token) VALUES (?,?,?,?,?,?);`;
				connection.query(insertQuery,[name, newID, phone, email, hash, token],(error)=>{
					console.log(error)
					if(error){
						throw(error)
					}else{
						res.json({
							token: token,
							name: name,
							msg: "registerSuccess"
						})
					}
					})
				}) 
           
			}
		).catch(
		// code to run if checkEmail rejects
			(error)=>{
				
				// throw error;
				res.json(error);
			}
		)
})

	// var thePromise = new Promise((resolve, reject)=>{
	// 	var insertQuery = `INSERT INTO users (name, phone, email, password) VALUES (?,?,?,?);`;
	// 	connection.query(insertQuery,[name, phone, email, password],(error)=>{
	// 		if(error){
	// 			reject(error)
	// 		}else{
	// 			resolve({msg: "success"})
	// 		}
	// 	})
	// })



module.exports = router;
