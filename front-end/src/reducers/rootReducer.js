// This is the master/root reducer



import { combineReducers } from 'redux'

// import each individual reducer to hand to combineReducers
// first: authreducer
import AuthReducer from './AuthReducer'
import ProductLineReducer from './ProductLineReducer'

// combineReducers takes an object as an arg
// that arg has key:value pair = statename: reducerfunction
// the reducerfunction will return a value
const rootReducer = combineReducers({
	auth: AuthReducer,
	productLineReducer: ProductLineReducer
})

export default rootReducer