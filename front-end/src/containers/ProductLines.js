import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class ProductLines extends Component{

	componentDidMount(){
		var pl = this.props.match.params.productLine
		console.log(pl)
		var url = `${window.apiHost}/productlines/${pl}/get`;
		axios.get(url)
		.then((response)=>{
			console.log(response)
		})
	}
	

	render(props){
		console.log(this.props)
		console.log(this.props.productLine)
		return(			
			<h1>{this.props.match.params.productLine} page</h1>			
		)
	}
}

function mapStateToProps(state){
	return{
		productLine: state.productLine
	}
}

export default connect(mapStateToProps)(ProductLines)