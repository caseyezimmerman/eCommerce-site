import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import GetCart from '../actions/GetCart'

class Cart extends Component{

	
	componentDidMount(){
		console.log(this.props.auth)
	}

	render(){
		return(
			<h1>Cart Page</h1>
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