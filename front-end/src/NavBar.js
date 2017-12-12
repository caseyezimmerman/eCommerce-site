import React, { Component } from 'react'

class NavBar extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			 <nav class="nav-extended teal lighten-4">
			    <div class="nav-wrapper">
			      <a href="#" class="brand-logo"></a>
			      <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
			      	<ul id="nav-mobile" class="hide-on-med-and-down">
			        	<li><a href="sass.html">Home</a></li>
			        	<li><a href="badges.html">Shop</a></li>
			        	<li><a href="collapsible.html">About Us</a></li>
			        	<li><a href="collapsible.html">Contact Us</a></li>
			      	</ul>
			      	<ul class="side-nav" id="mobile-demo">
			        	<li><a href="sass.html">Home</a></li>
			        	<li><a href="badges.html">Shop</a></li>
			        	<li><a href="collapsible.html">About Us</a></li>
			        	<li><a href="collapsible.html">Contact Us</a></li>
			     	</ul>
			      	<ul>
			      		<li class="right tab"><a class="active" href="#test2"><button class="btn grey">Search</button></a></li>
			        	<li class="right tab"><a href="#test1"><input type="text" placeholder="Search for an item" /></a></li>
			     	</ul>
			    </div>
			    <div class="nav-content">
			 		
			     	<ul class="tabs tabs-transparent">
			     		<li>Classic models logo</li>
			     		<li class="right">(0) items in cart | ($0.00)</li>
			      		<li class="right">Sign in or Create account:</li>	                				       			  
			      	</ul>
			    </div>
			    
			  </nav>
			 
		)
	}
}


export default NavBar