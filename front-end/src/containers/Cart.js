import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import GetCart from '../actions/GetCart'
import CartRow from '../containers/CartRow'
class Cart extends Component{


	componentDidMount(){
		if(this.props.auth.token === undefined){
		// the user has no token they shuld not be here
			// this.props.history.push('/login')
		}else{
		// the user does have a token, go get their cart
			this.props.getCart(this.props.auth.token)
		}
	}

	render(){
		if((!this.props.cart.totalItems) || (this.props.cart.length === 0)){
			// if this return occurs...the render is DONE
			return(
				<div>
					<h3>Your cart is empty...Get shopping!</h3>
				</div>
			)
		}
		console.log(this.props.cart.products)
		var cartArray = this.props.cart.products.map((product,index)=>{
			console.log(product)
			return(
				<CartRow key={index} product={product} />
			)
		})
		return(
			<div>
				{cartArray}
			</div>
		)
	}
}



function mapStateToProps(state){
	return{
		auth: state.auth,
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			getCart: GetCart
	},dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart)