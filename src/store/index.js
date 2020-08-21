import appReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const consoleMessages = store => next => action => {

	let result

	// // console.groupCollapsed(`dispatching action => ${action.type}`)
	// // console.log('acions payload', action.payload)
	result = next(action)

	// let { current_stock } = store.getState();

	// console.log(`

	// 	current_stock: ${current_stock}

	// `)

	// console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}