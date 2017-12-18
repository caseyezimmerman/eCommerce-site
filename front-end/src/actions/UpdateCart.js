import axios from 'axios'

export default function(userToken, productCode){
	console.log(userToken)
	console.log(productCode)
	console.log('update cart action running')

	const thePromise = axios({
		method: 'POST',
		url: `${window.apiHost}/updateCart`,
		data:{
			userToken: userToken,
			productCode: productCode
		}
	})

	return{
		type: 'UPDATE_CART',
		payload: thePromise
	}
}