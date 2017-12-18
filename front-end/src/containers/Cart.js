import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import GetCart from '../actions/GetCart'
import CartRow from '../containers/CartRow'
import axios from 'axios'


class Cart extends Component{
	constructor(){
		super()
		this.makePayment = this.makePayment.bind(this)
	}

	makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_dwzdKdt62kxe7hdiEhLdiGWO',
            locale: 'auto',
            token: (token) => {
                var theData = {
                    amount: this.props.cart.totalPrice * 100,
                    stripeToken: token.id,
                    userToken: this.props.auth.token,
                }
                axios({
                    method: 'POST',
                    url: `${window.apiHost}/stripe`,
                    data: theData
                }).then((response) => {
                    console.log(response.data);
                    if(response.data.msg === 'paymentSuccess') {
                    	this.props.history.push('/thankyou')
                    }else{
                    	console.log(response.data.msg)
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Pay Now',
            amount: this.props.cart.totalPrice * 100
        })
    }

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
				<h2>Your order total is: ${this.props.cart.totalPrice} - <button className="btn teal darken-1" onClick={this.makePayment}>Checkout</button></h2>
				<table className="table table-striped">
					<thead>
						<th>Product</th>
						<th>Price</th>
						<th>Remove</th>
					</thead>
					<tbody>
						{cartArray}
					</tbody>
				</table>
			</div>
		)
	}
}



function mapStateToProps(state){
	return{
		auth: state.auth,
		cart: state.cart ////redux state that allows us to use cart in here
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
			getCart: GetCart
	},dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart)