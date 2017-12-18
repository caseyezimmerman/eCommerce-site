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
			var name = results[0].name;
			if(checkHash === true){
				// create a new token
				// update their row in the DB with the token
				// send sme json backt o react/ajax/axios
				var newToken = randToken.uid(100)
				var updateTokenQuery = `UPDATE users SET token = ? WHERE email = ?;`;
				connection.query(updateTokenQuery,[newToken, email],(error)=>{
					if(error){
						throw error;
					}else{
						res.json({
						msg: "loginSuccess",
						token: newToken,
						name: name //which we got from customerName when we did an inner join
						//even though I have name in users table (just following Rob)
						})
					}
				})
					
					
				
			}else{
				// passwords do not match 
				res.json({
				msg: "wrongPassword"
				})
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

router.get('/productLines/get',(req,res,next)=>{
	var selectQuery = `SELECT * FROM productlines;`;
	connection.query(selectQuery, (error,results)=>{
		if(error){
			throw error
		}else{
			res.json(results)
		}
	})
})

router.get('/productlines/:productline/get',(req,res,next)=>{
	var pl = req.params.productline
	var plQuery = `SELECT * FROM productlines 
	INNER JOIN products ON productlines.productLine = products.productLine 
	WHERE products.productLine = ?;`
	connection.query(plQuery,[pl],(error,results)=>{
		if(error){
			throw error
		}else{
			res.json(results)
		}
	})
})

router.post('/updateCart', (req,res,next)=>{
	var productCode = req.body.productCode
	var userToken = req.body.userToken
	// is this even a valid token??
	var getUidQuery = `SELECT id FROM users WHERE token = ?;`;
	connection.query(getUidQuery,[userToken],(error,results)=>{
		if(error){
			throw error
		}else if(results.length === 0){
			// /this token is bad there is no user logged in
			res.json({
				msg: 'badToken'
			})
		}else{
			// get usersid for the last query
			const uid = results[0].id
			// this is a good token
			var addToCartQuery = `INSERT INTO cart (uid, productCode) VALUES (?,?);`
			connection.query(addToCartQuery,[uid,productCode],(error)=>{
				if(error){
					throw error
				}else{
					// get the sum of tei products and their total
					const getCartTotals = `SELECT SUM(buyPrice) as totalPrice, count(buyPrice) as totalItems 
					FROM cart
					INNER JOIN products ON products.productCode = cart.productCode 
					WHERE cart.uid = ?;`
					connection.query(getCartTotals,[uid],(error,cartResults)=>{
						if(error){
							throw error
						}else{
							res.json(cartResults)
						}
					})
				}
			})
		}

		
		
	})
	// res.json(req.body)
})

router.post('/getCart',(req,res,next)=>{
	const userToken = req.body.token
	var getUidQuery = `SELECT id FROM users WHERE token = ?;`;
	connection.query(getUidQuery,[userToken],(error,results)=>{
		if(error){
			throw error
		}else if(results.length === 0){
			// /this token is bad there is no user logged in
			res.json({
				msg: 'badToken'
			})
		}else{
			// get usersid for the last query
			const uid = results[0].id
			// this is a good token
			const getCartTotals = `SELECT SUM(buyPrice) as totalPrice, count(buyPrice) as totalItems 
					FROM cart
					INNER JOIN products ON products.productCode = cart.productCode 
					WHERE cart.uid = ?;`
					connection.query(getCartTotals,[uid],(error,cartResults)=>{
						if(error){
							throw error
						}else{
							res.json(cartResults)
						}
					})
		}
	})
		
})


router.post('/fakelogin', (req, res, next)=>{
	const getFirstUser = `SELECT * from users limit 1;`;
	connection.query(getFirstUser, (error, results)=>{
		if(error){
			throw error;
		}
		res.json({
			msg: "loginSuccess",
			token: results[0].token,
			name: results[0].name
		});				
	})

});

// `SELECT * FROM productlines
// 	INNER JOIN products ON productlines.productLine = products.productLine
// 	WHERE productlines.productLine = ?`

	



module.exports = router;
