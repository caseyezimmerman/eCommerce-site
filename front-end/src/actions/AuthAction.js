// An aciton is a JS function that returns an object
// that object MUST have at least a property of type
import axios from 'axios'

function AuthAction(name, phone, email, password){
	console.log("auth is running")
	console.log(name);
	var axiosPromise = axios({
		url: `${window.apiHost}/register`,
		method: 'POST',
		data: {
			name: name,
			phone: phone,
			email: email,
			password: password
		}
	})
	// our redux-promise middleware will kick in
	// because the payload value is a redux-promise
	// redux-ppromise will hold up dispatch until it resolves
	return{
		type: 'AUTH_ACTION',
		payload: axiosPromise
	}
}

export default AuthAction