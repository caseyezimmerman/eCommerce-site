import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class SlickSlider extends Component{
	render(){
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		}
		return(
			<div className="container">
				<Slider {...settings}>
					<div className="slick-image"><img src="/dog-images/image1.jpg" /></div>
					<div className="slick-image"><img src="/dog-images/image2.jpg" /></div>
					<div className="slick-image"><img src="/dog-images/image3.jpg" /></div>
					<div className="slick-image"><img src="/dog-images/image4.jpg" /></div>
					<div className="slick-image"><img src="/dog-images/image5.jpg" /></div>
				</Slider>
			</div>
		)
	}
}

export default SlickSlider