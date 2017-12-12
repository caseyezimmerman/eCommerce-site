import React, { Component } from 'react'
import { Row, Input} from 'react-materialize'; 


class Register extends Component{
	render(){
		return(
			<Row>
				<Input s={6} label="First Name" />
				<Input s={6} label="Last Name" />
				<Input type="password" label="password" s={12} />
				<Input type="email" label="Email" s={12} />
			</Row>
		)
	}
}

export default Register