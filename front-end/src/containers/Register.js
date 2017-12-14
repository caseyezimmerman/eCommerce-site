import React, { Component } from 'react';
import { Row, Input, Icon, Button} from 'react-materialize'; 
import { connect } from 'react-redux';
// we need bindActionCreators so that we can correlate an action to the dispatcher
import { bindActionCreators } from 'redux';
import AuthAction from '../actions/AuthAction'

class Register extends Component{
	constructor(){
		super()
		this.state = {
			error: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillReceiveProps(newProps){
		console.log(this.props)
		console.log(newProps)
		if(newProps.auth.msg === 'registerSuccess'){
			// the user was insertes
			// we have the token and name safely in the auth reducer
			// move them to the home page
			this.props.history.push('/')
		}else if(newProps.auth.msg === "userExists"){
			this.setState({
				error: "This email address already exists. Please log in"
			})
		}
	}

	handleSubmit(event){
		event.preventDefault()
		const name = document.getElementById('name').value
		const phone = document.getElementById('phone').value
		const email = document.getElementById('email').value
		const password = document.getElementById('password').value
		const city = document.getElementById('city').value
		const state = document.getElementById('state').value
		this.props.authAction(name, phone, email, password, city, state)
		if(name === ""){
			this.setState({
				error: "Name field cannot be empty"
			})
		}
		
	}
	render(){
		// console.log(this.props.auth)
		return(

			<form onSubmit = {this.handleSubmit}>

			<h2>Register</h2>
				<Row >
					<Row>
						<Input id="name" s={7} label="Full Name" ><Icon>account_circle</Icon></Input>
						
						<Input id="phone" s={7} label="Phone"><Icon>phone</Icon></Input>
						<Input id="email" type="email" label="Email" s={7} />
						<Input id="password" type="password" label="Password" s={7} />
						<Input id="city"  label="City" s={7} />
						<Input id="state"  label="State" s={7} />
					</Row>
					<Row>
						<Input name='group1' type='checkbox' value='sub' label='I would like to subscribe to e-mails!' defaultChecked='checked' id="box"/>
					</Row>
					<Row>
						<Button waves='light'>Register<Icon left>pets</Icon></Button>
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
	// state = RootReducer
	return{
		// key = this.props.key will be accessible to this component
		// value = property of Root Reducer
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch){
	// dispatch is the thing that takes any action
	// and sends it out to all the reducers
	return bindActionCreators({
		authAction: AuthAction 
	}, dispatch)
}

// export default Register
// Register component needs access to the dispatcher and state
export default connect(mapStateToProps, mapDispatchToProps)(Register)

