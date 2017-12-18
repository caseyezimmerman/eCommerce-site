import React from 'react'

function CartRow(props){
	const product = props.product;
	return(
		<h1>{product.productName}</h1>
	)
}

export default CartRow