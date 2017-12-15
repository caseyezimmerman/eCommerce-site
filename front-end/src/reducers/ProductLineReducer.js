function ProductLineReducer (state=[], action){
	console.log(action.type)
	if(action.type === 'GET_PRODUCTLINES'){
		console.log(action.payload)
		return action.payload.data
	}
	return state;
}

export default ProductLineReducer