import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Student from './Student'

// get the create store method from the redux module
// as well as the apply middle ware methos
import { createStore, applyMiddleware } from 'redux'

// createstore needs a reducer. More specifically a root reducer
import rootReducer from './reducers/rootReducer'

// we are going to use ajax a lot
// we will use it in our redux actions which means we need redux promise
import reduxPromise from 'redux-promise'

// we have set up redux. now we need a way to tell react about it 
// USE PROVIDER!!!
import { Provider } from 'react-redux'

// create the store
const theStore = applyMiddleware(reduxPromise)(createStore)(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// OR DO THIS
// const middeWare = applyMiddleware(reduxPromise)
// const storeWithMid = middleWare(createStore)
// const theStore = storeWithMid(rootReducer)

// hand render the provider and hand provider the store
// put app INSIDE of the provider, so that everything inside of app will know about the provider/ theStore
ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>, 
	document.getElementById('root')
	);

