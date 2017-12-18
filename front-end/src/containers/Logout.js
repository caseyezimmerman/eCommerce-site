import React, { Component } from 'react';
import {Row, Input, Icon, Button} from 'react-materialize';
// this is a container that knows about redux so we need connect
import { connect } from 'react-redux';
// we need bindActionCreators because we have redux actions that will dispatch
import { bindActionCreators } from 'redux';
import LoginAction from '../actions/LoginAction';
import LogoutAction from '../actions/LogoutAction'

class Logout extends Component{
	constructor(){
		super();

	}

	componentDidMount(){
		this.props.logoutAction()
	}


	render(){
		console.log(this.props.auth)
		return(
			<div>
				Logging out....
			</div>
		)
		
	}
}



function mapDispatchToProps(dispatch){
	return bindActionCreators({
		logoutAction: LogoutAction
	},dispatch)
}

export default connect(null, mapDispatchToProps)(Logout)
