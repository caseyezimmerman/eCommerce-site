import axios from 'axios'

function LoginAction(email, password){
	// if(formData === 'fake'){
	// 	console.log("fake action")
	// 	var axiosPromise = axios({
	// 	method: 'POST',
	// 	url: `${window.apiHost}/fakelogin`,
	// 	data: formData
	// })
	// }else{	
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