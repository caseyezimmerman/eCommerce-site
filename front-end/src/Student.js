import React, {Component} from 'react'

class Student extends Component{
	render(){
		var students=[
		"casey",
		"eddie",
		"jamie",
		"chris"
		];
		var studentsArray = students.map((student)=>{
			return(<li>{student}</li>)
		})
		return(
			<div>
				{studentsArray}
			</div>
		)
		
	}
}

export default Student