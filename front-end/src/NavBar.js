import React, { Component } from 'react'

class NavBar extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div id="navbar">
				<nav className="navbar navbar-fixed-top">
	              	<div className="container-fluid navbar-white">
		              	<div className="container">
			                <ul className="nav navbar-nav list">
			                	<li>Home</li>
			                	<li>Shop</li>
			                	<li>About Us</li>
			                	<li>Contact Us</li>
			                </ul>
			            </div>
	                </div>
	                <div className="container-fluid navbar-default">
	                	<div className="container">
	                		<div className="nav navbar-header">
	                		Classic Models Logo
	                		</div>
	                		<div className="nav navbar-nav pull-right">
	                			<li>Sign in or Create account:</li>
	                			<li>(0) items in cart | ($0.00)</li>
	                		</div>
	                	</div>
	                </div>
                </nav>
			</div>
		)
	}
}


export default NavBar