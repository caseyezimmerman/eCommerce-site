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

		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event){
		event.preventDefault()
		const name = event.target[0].value
		const phone = event.target[1].value
		const email = event.target[2].value
		const password = event.target[3].value
		this.props.authAction(name, phone, email, password)
		
	}
	render(){
		console.log(this.props.auth)
		return(

			<form onSubmit = {this.handleSubmit}>
			<h2>Register</h2>
				<Row >
					<Row>
						<Input id="name" s={7} label="Full Name" ><Icon>account_circle</Icon></Input>
						
						<Input id="phone" s={7} label="Phone"><Icon>phone</Icon></Input>
						<Input id="email" type="email" label="Email" s={7} />
						<Input id="password" type="password" label="Password" s={7} />
						<Input s={7} label="" defaultValue="Customer" disabled />
					</Row>
					<Row>
						<Input name='group1' type='checkbox' value='sub' label='I would like to subscribe to e-mails!' defaultChecked='checked' id="box"/>
					</Row>
					<Row>
						<Button waves='light'>Register<Icon left>pets</Icon></Button>
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

