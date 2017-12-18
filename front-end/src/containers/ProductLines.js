import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import ProductRow from './ProductRow'
import { bindActionCreators } from 'redux'
import UpdateCart from '../actions/UpdateCart'

class ProductLines extends Component{
	constructor(){
	super()
		this.state = {
			productList: []
		}
		this.getProducts = this.getProducts.bind(this)
	}

	getProducts(props){
		const pl = props.match.params.productLine
		console.log(pl)
		var url = `${window.apiHost}/productlines/${pl}/get`;
		console.log(url)
		axios.get(url)
		.then((response)=>{
			console.log(response)
			this.setState({
				productList: response.data
			})
		})
	}

	componentDidMount(props){
		this.getProducts(this.props)
	}

	componentWillReceiveProps(newProps){
		this.getProducts(newProps)
	}
	

	render(){
		// console.log(this.props);
		// console.log(this.props.pl)
		console.log(this.state.productList);
		const products = this.state.productList.map((product,index)=>{
			console.log(products)
			return (
				<ProductRow 
					key={index} 
					product={product} ///passing product to productRow
					addToCart={this.props.updateCart}
					token={this.props.auth.token}
				/>
			)
		})
		var thisPL = this.props.productLine.filter((obj)=>{
			return obj.productLine === this.props.match.params.productLine
		})
		if(thisPL.length === 0){
			var desc = ""
		}else{

			desc = thisPL[0].textDescription
			console.log(desc)
		}
		var Link = decodeURIComponent(this.props.match.params.productLine)
		return(
			<div>
				<h1>Welcome to the {Link} page</h1>
				<p></p>
				<div className="products">
					<table className = 'table'>
						<thead>
							<tr>
								<th className="table-head">Product Name</th>
								<th className="table-head">Description</th>
								<th className="table-head">In Stock</th>
								<th className="table-head">Price</th>
								<th className="table-head"></th>
							</tr>
						</thead>
						<tbody>
							{products}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		productLine: state.productLineReducer,
		auth: state.auth
	}
}

// we need access to the update cart action
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		updateCart: UpdateCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLines)