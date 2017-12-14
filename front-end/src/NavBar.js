import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import { connect } from 'react-redux'
import GetProductLines from './actions/GetProductLines'
import { bindActionCreators } from 'redux'

class NavBar extends Component{
	constructor(){
		super();
	}

	componentDidMount(){
		this.props.getProductLines()
	}

	componentWillReveiveProps(newProps){
		
	}

	render(){
		if(this.props.auth.name !== undefined){
			// the user is logged in
			var rightMenuBar = [
				<li key={1}><Icon>pets</Icon></li>,
				<li key={2} className="right"><Link to='/cart'>(0) items in cart | ($0.00)</Link></li>,
				<li key={3} className="right">Welcome, {this.props.auth.name}</li>
				
			]
		}else{
			var rightMenuBar = [
				
	     		<li key={0}><Icon>pets</Icon></li>,
	     		<li key={1} className="right">(0) items in cart | ($0.00)</li>,
	      		<li key={2} className="right log"><Link to="/login">Sign in</Link></li>,
	      		<li key={3} className="right log">|</li>,
	      		<li key={4} className="right log"><Link to="/register">Create Account</Link></li>	                				       			  
		      
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
			        	<li><a href="badges.html"><Link to="/shop">Shop</Link></a></li>
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
		auth: state.auth,
		productLines: state.productLineReducer //what i called it in root reducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getProductLines: GetProductLines
	},dispatch)

}




export default connect(mapStateToProps, mapDispatchToProps)(NavBar)


