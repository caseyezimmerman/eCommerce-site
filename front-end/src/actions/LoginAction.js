import axios from 'axios'

function LoginAction(email,password){	
	var axiosPromise = axios({
		method: 'POST',
		url: `${window.apiHost}/login`,
		data: {
			email: email,
			password: password
		}
	})
	console.log('login action running')
	return {
		type: 'AUTH_ACTION',
		payload: axiosPromise
	}
}

export default LoginAction