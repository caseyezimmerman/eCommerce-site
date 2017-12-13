// A reducer is a FUNCTION that returns a peice of state

function AuthReducer (state=[], action){
	if(action.type === 'AUTH_ACTION'){
		// im going to update
		return action.payload
	}else{
		// i dont care about this action. just return state
		return state
	}
	
}

export default AuthReducer