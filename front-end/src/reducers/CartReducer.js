function CartReducer (state=[], action){
	if((action.type === 'UPDATE_CART') || (action.type === 'GET_CART')){
		// im going to update
		return action.payload.data
	}else{
		// i dont care about this action. just return state
		return state
	}
	
}

export default CartReducer