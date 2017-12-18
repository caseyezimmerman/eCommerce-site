import axios from 'axios'

function LoginAction(formData){
	if(formData === 'fake'){
		console.log("fake action")
		var axiosPromise = axios({
		method: 'POST',
		url: `${window.apiHost}/fakelogin`,
		data: formData
	})
	}else{	
	var axiosPromise = axios({
		method: 'POST',
		url: `${window.apiHost}/login`,
		data: formData
	})
}
	console.log('login action running')
	return {
		type: 'AUTH_ACTION',
		payload: axiosPromise
	}
}

export default LoginAction