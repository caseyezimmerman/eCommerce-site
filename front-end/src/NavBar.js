import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import { connect } from 'react-redux'

class NavBar extends Component{
	constructor(){
		super();
	}

	componentWillReveiveProps(newProps){
		
	}
	render(){
		if(this.props.auth.name !== undefined){
			// the user is logged in
			var rightMenuBar = [
				<li><Icon>pets</Icon></li>,
				<li className="right"><Link to='/cart'>(0) items in cart | ($0.00)</Link></li>,
				<li className="right">Welcome, {this.props.auth.name}</li>
				
			]
		}else{
			var rightMenuBar = [
				
	     		<li><Icon>pets</Icon></li>,
	     		<li className="right">(0) items in cart | ($0.00)</li>,
	      		<li className="right log"><Link to="/login">Sign in</Link></li>,
	      		<li className="right log">|</li>,
	      		<li className="right log"><Link to="/register">Create Account</Link></li>	                				       			  
		      
			]
		}
		console.log(this.props.auth)
		return(
			 <nav className="nav-extended">
			    <div className="nav-wrapper teal lighten-2">
			      <a href="#" className="brand-logo"></a>
			      <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
			      	<ul id="nav-mobile" className="hide-on-med-and-down">
			        	<li><Link to="/">Home</Link></li>
			        	<li><a href="badges.html">Shop</a></li>
			        	<li><a href="collapsible.html">About Us</a></li>
			        	<li><a href="collapsible.html">Contact Us</a></li>
			      	</ul>
			      	<ul className="side-nav" id="mobile-demo">
			        	<li><Link to="/">Home</Link></li>
			        	<li><a href="badges.html">Shop</a></li>
			        	<li><a href="collapsible.html">About Us</a></li>
			        	<li><a href="collapsible.html">Contact Us</a></li>
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
		auth: state.auth
	}
}




export default connect(mapStateToProps)(NavBar)


