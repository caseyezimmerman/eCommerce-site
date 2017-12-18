import axios from 'axios'

export default function(token){
	var thePromise = axios({
		method: 'POST',
		url: `${window.apiHost}/getCart`,
		data: {
			token: token
		}
	});
	return{
		type: 'GET_CART',
		payload: thePromise
	}
}