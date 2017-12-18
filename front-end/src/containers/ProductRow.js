import React from 'react'

function ProductRow(props){
	console.log(props)
	const product = props.product /////getting product from productLine!!!
	if(props.token === undefined){
		// this user is NOT logged in
		var button = ""
	}else{
		var button = <button 
			className="btn primary" 
				onClick={()=>{
					props.addToCart(props.token,product.productCode)
					console.log(product.productCode)
				}}
			>Add to Cart</button>
	}
	
	console.log(product)
	return(
		<tr>
			<td>{product.productLine}</td>
			<td></td>
			<td></td>
			<td>{product.buyPrice}</td>
			<td>{button}</td>
		</tr>
	)
}

export default ProductRow