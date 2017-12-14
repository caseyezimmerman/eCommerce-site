import React, { Component } from 'react';
import {Row, Input, Icon, Button} from 'react-materialize';
// this is a container that knows about redux so we need connect
import { connect } from 'react-redux';
// we need bindActionCreators because we have redux actions that will dispatch
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';

class Login extends Component{
	constructor(){
		super();
		this.state = {
			error: ""
		}
		// IF WE NEED TO USE THIS IN A FUNCTION THAT WE CREATED (LIFECYCLE METHOD)
		// WE HAE TO BIND THAT METHOD
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event){
		event.preventDefault()
		console.log('handleSubmit running')
		console.dir(event.target)
		var email = event.target[0].value
		var password = event.target[1].value
		console.log(email)
		console.log(password)
		// var formData = {
		// 	email: email,
		// 	password: password
		// }
		if(email.length === 0){

		}else if(password.length === 0){
			this.setState({
				error: "Password field cannot be empty"
			})
		}else{
			this.props.loginAction(email,password)
		}

	}


	render(){
		return(
			<form onSubmit = {this.handleSubmit}>

			<h2>Login</h2>
				<Row >
					<Row>
						<Input id="email" type="email" required="true" label="Email" s={7} />
						<Input id="password" type="password" required="true" label="Password" s={7} />
					</Row>
					<Row>
						<Button waves='light'>Login<Icon left>pets</Icon></Button>
					</Row>
					<Row>
						<h5 className="error">{this.state.error}</h5>
					</Row>					
				</Row>
			</form>
		)
		
	}
}

function mapStateToProps(state){
	return{
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		loginAction: LoginAction
	},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
