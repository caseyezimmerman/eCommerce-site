import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Student from './Student'

// get the create store method from the redux module
// as well as the apply middle ware methos
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/rootReducer'
import reduxPromise from 'redux-promise'

// createstore needs a reducer. More specifically a root reducer

ReactDOM.render(
	<App />, 
	document.getElementById('root')
	);

