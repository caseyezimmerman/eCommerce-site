import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import { connect } from 'react-redux'
import GetProductLines from './actions/GetProductLines'
import { bindActionCreators } from 'redux'
import LoginAction from './actions/LoginAction'
import GetCart from './actions/GetCart'

class NavBar extends Component{
	constructor(){
		super();
		this.fakeLogin = this.fakeLogin.bind(this)
	}

	fakeLogin(){
		this.props.loginAction('fake')
	}

	componentDidMount(){
		this.props.getProductLines() //coming from disptch to props
	}

	componentWillReceiveProps(newProps){
		// console.log(newProps)
		if(newProps.auth.msg === 'loginSuccess'){
			// the user just logged in. go get their cart
		}
	}

	render(){
		console.log(this.props.cart)
		if(this.props.auth.name !== undefined){
			// the user is logged in
			if(this.props.cart.totalItems !== undefined){
				// there is something in the cart
				var totalPrice = this.props.cart.totalPrice
				var totalItems = this.props.cart.totalItems
				var cartText = `(${totalItems}) items in your cart | ($${totalPrice})`
			}else{
				cartText = "(0) items in cart | ($0.00)"
			}
		}
		if(this.props.auth.name !== undefined){
			// the user is logged in
			var rightMenuBar = [
				<li key={1}><Icon>pets</Icon></li>,
				<li key={4} className="right"><button className='btn primary'><Link to='/logout'>Logout</Link></button></li>,
				<li key={2} className="right"><Link to='/cart'>{cartText}</Link></li>,
				<li key={3} className="right">Welcome, {this.props.auth.name}</li>
				
			]
		}else{
			rightMenuBar = [
				
	     		<li key={0}><Icon>pets</Icon></li>,
	     		<li key={5} className="right"><button className="btn btn-primary" onClick={this.fakeLogin}>FAKE LOGIN</button></li>,
	     		<li key={1} className="right">{cartText}</li>,
	      		<li key={2} className="right log"><Link to="/login">Sign in</Link></li>,
	      		<li key={3} className="right log">|</li>,
	      		<li key={4} className="right log"><Link to="/register">Create Account</Link></li>	                				       			  
		      
			]
		}

		// console.log(this.props.auth)
		var shopMenu = this.props.productLines.map((productline,index)=>{
			var safeLink = encodeURIComponent(productline.productLine)
			return(<Link key={index} to={`/shop/${safeLink}`}>{productline.productLine}</Link>)
		})
		// console.log(shopMenu)
		return(
			 <nav className="nav-extended">
			    <div className="nav-wrapper teal lighten-2">
			      <a href="" className="brand-logo"></a>
			      <a href="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
			      	<ul id="nav-mobile" className="hide-on-med-and-down">
			        	<li><Link to="/">Home</Link></li>
			        	<li className = "dropdown">
			        		<Link to="/shop">Shop</Link>
			        		<ul>
			        			<li className = "dropdown-links">
			        				{shopMenu}
			        			</li>
			        		</ul>
			        	</li>
			        	<li><Link to="/shop">About Us</Link></li>
			        	<li><a href="collapsible.html">Contact Us</a></li>
			        	<li><Link to='/cart'>Shopping Cart</Link></li>
			      	</ul>
			      	<ul className="side-nav" id="mobile-demo">
			        	<li><Link to="/">Home</Link></li>
			        	<li className = "dropdown">
			        		<Link to="/shop/Food">Shop</Link>
			        		<ul>
			        			<li className = "dropdown-links">
			        				{shopMenu}
			        			</li>
			        		</ul>
			        	</li>
			        	<li><a href="collapsible.html">About Us</a></li>
			        	<li><a href="collapsible.html">Contact Us</a></li>
			        	<li><Link to='/cart'>Shopping Cart</Link></li>
			     	</ul>
			      	<ul>
			      		<li className="right tab"><a className="active" href="#test2"><button className="btn grey">Search</button></a></li>
			        	<li className="right tab"><a href="#test1"><input type="text" placeholder="Search for an item" /></a></li>
			     	</ul>
			    </div>
			    <div className="nav-content teal lighten-3">
				     <ul className="tabs tabs-transparent">
			     		{rightMenuBar}	                				       			  
			      	</ul>
			    </div>
			    
			  </nav>
			 
		)
	}
}


function mapStateToProps(state){
	return{
		auth: state.auth,
		productLines: state.productLineReducer, //what i called it in root reducer
		cart: state.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines,
		loginAction: LoginAction,
		getCart: GetCart

	},dispatch)

}




export default connect(mapStateToProps, mapDispatchToProps)(NavBar)


