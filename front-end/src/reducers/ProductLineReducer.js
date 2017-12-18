function ProductLineReducer (state=[], action){
	if(action.type === 'GET_PRODUCTLINES'){
		console.log(action.payload)
		return action.payload.data
	}
	return state;
}

export default ProductLineReducer