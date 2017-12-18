import React, { Component } from 'react';
// this is a container that knows about redux so we need connect
import { connect } from 'react-redux';
// we need bindActionCreators because we have redux actions that will dispatch
import { bindActionCreators } from 'redux';
import LogoutAction from '../actions/LogoutAction'

class Logout extends Component{


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
