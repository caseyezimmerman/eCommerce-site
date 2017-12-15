import axios from 'axios'

function GetProductLines(){
	var ajaxPromise = axios.get(`${window.apiHost}/productlines/get`);
	return {
		type: 'GET_PRODUCTLINES',
		payload: ajaxPromise
	}
}

export default GetProductLines