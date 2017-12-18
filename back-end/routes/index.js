var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require ('bcrypt-nodejs')
var config = require ('../config/config')
var connection = mysql.createConnection(config);
var stripe = require('stripe')(config.stripeKey)
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
					const getCartTotals = `SELECT ROUND(SUM(buyPrice),2) as totalPrice, count(buyPrice) as totalItems 
					FROM cart
					INNER JOIN products ON products.productCode = cart.productCode 
					WHERE cart.uid = ?;`
					connection.query(getCartTotals,[uid],(error,cartResults)=>{
						if(error){
							throw error
						}else{
							var finalCart = cartResults[0] ///final cart will be an object with total items and totla price
									// ew dont care about their products array on update
									// we only care about it on the /cart page
									// so returning an empty products array is safe
									
									finalCart.products = [];
									finalCart.totalPrice = (finalCart.totalPrice * 100) / 100
									console.log(finalCart)
									res.json(finalCart)
							// res.json(cartResults[0])
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
			const getCartTotals = `SELECT ROUND(SUM(buyPrice),2) as totalPrice, count(buyPrice) as totalItems 
					FROM cart
					INNER JOIN products ON products.productCode = cart.productCode 
					WHERE cart.uid = ?;`
					connection.query(getCartTotals,[uid],(error,cartResults)=>{
						if(error){
							throw error
						}else{
							// res.json(cartResults)
							const getCartProducts = `SELECT * FROM cart
							INNER JOIN products on products.productCode = cart.productCode
							WHERE uid = ?;`
							connection.query(getCartProducts,[uid],(error, cartContents)=>{
								if(error){
									throw error
								}else{

									// cartResults comes from the query above
									var finalCart = cartResults[0] ///final cart will be an object with total items and totla price
									// ew dont care about their products array on update
									// we only care about it on the /cart page
									// so returning an empty products array is safe

									finalCart.products = cartContents;
									console.log(finalCart)
									res.json(finalCart)
								}
							})
						}
					})
		}
	})
		
})

router.post('/stripe',(req,res,next)=>{
	// bring in vars from the ajax request
	const userToken = req.body.userToken;
	const stripeToken = req.body.stripeToken;
	const amount = req.body.amount
	// stripe module required above is associated with our secreykey
	// it has a charged object which has multiple methods
	// the one we want is create
	// create takes 2 args
	// 1. object (stripe stuff)
	// 2. function to run when done
	stripe.charges.create({
		amount: amount,
		currency: 'usd',
		source: stripeToken,
		description: 'Charges for PetStore'
	},
	(error,charge)=>{
		// stripe, when the charge has been run, 
		// runs this callback and sends it any errors and the charge object
			if(error){
				res.json({
					msg: error
				})
		}else{
			// Insert stuff from cart that was just paid into:
			// - orders
			const getUserQuery = `SELECT MAX(users.id) as id, MAX(users.cId) as cId,MAX(cart.productCode) as productCode, MAX(products.buyPrice) as buyPrice, COUNT(cart.productCode) as quantity FROM users 
				INNER JOIN cart ON users.id = cart.uid
				INNER JOIN products ON cart.productCode = products.productCode
			WHERE token = ?
			GROUP BY products.productCode;`
			console.log(userToken)
			console.log(getUserQuery);
			connection.query(getUserQuery, [userToken], (error2, results2)=>{
				console.log("==========================")
				console.log(results2)
				console.log("==========================")
				const customerId = results2[0].cId;
				console.log(results2[0])
				const insertIntoOrders = `INSERT INTO orders
					(orderDate,requiredDate,comments,status,customerNumber)
					VALUES
					(NOW(),NOW(),'Website Order','Paid',?)`
					connection.query(insertIntoOrders,[customerId],(error3,results3)=>{
						console.log(results3)
						console.log(error3)
						const newOrderNumber = results3.insertId;
						// results2 (the select query above) contains an array of rows. 
						// Each row has the uid, the productCOde, and the price
						// map through this array, and add each one to the orderdetails tabl

						// Set up an array to stash our promises inside of
						// After all the promises have been created, we wil run .all on this thing
						var orderDetailPromises = [];
						// Loop through all the rows in results2, which is...
						// a row for every element in the users cart.
						// Each row contains: uid, productCode,BuyPrice
						// Call the one we're on, "cartRow"
						results2.map((cartRow)=>{
							// Set up an insert query to add THIS product to the orderdetails table
							var insertOrderDetail = `INSERT INTO orderdetails
								(orderNumber,productCode,quantityOrdered,priceEach,orderLineNumber)
								VALUES
								(?,?,?,?,1)`
							// Wrap a promise around our query (because queries are async)
							// We will call resolve if it succeeds, call reject if it fails
							// Then, push the promise onto the array above
							// So that when all of them are finished, we know it's safe to move forward

							const aPromise = new Promise((resolve, reject) => {
								connection.query(insertOrderDetail,[newOrderNumber,cartRow.productCode,cartRow.quantity, cartRow.buyPrice],(error4,results4)=>{
									// another row finished.
									if (error4){
										reject(error4)
									}else{
										resolve(results4)
									}
								})
							})
							orderDetailPromises.push(aPromise);
						})
						// When ALL the promises in orderDetailPromises have called resolve...
						// the .all function will run. It has a .then that we can use
						Promise.all(orderDetailPromises).then((finalValues)=>{
							console.log("All promises finished")
							console.log(finalValues)
							const deleteQuery = `
								DELETE FROM cart WHERE uid = ${results2[0].id}
							`
							connection.query(deleteQuery, (error5, results5)=>{
								// - orderdetails
								// Then remove it from cart
								res.json({
									msg:'paymentSuccess'
								})								
							})
						});

					})
			});

		}

	})
})


// router.post('/fakelogin', (req, res, next)=>{
// 	const getFirstUser = `SELECT * from users limit 1;`;
// 	connection.query(getFirstUser, (error, results)=>{
// 		if(error){
// 			throw error;
// 		}
// 		res.json({
// 			msg: "loginSuccess",
// 			token: results[0].token,
// 			name: results[0].name
// 		});				
// 	})

// });

// `SELECT * FROM productlines
// 	INNER JOIN products ON productlines.productLine = products.productLine
// 	WHERE productlines.productLine = ?`

	



module.exports = router;
