import * as ActionTypes from './ActionTypes.js';
import { combineReducers } from 'redux';

const formReducer= (state= [], action) => {
	switch (action.type){
		case ActionTypes.DELETE_FORM:
			return [...state.slice(0, action.index), ...state.slice(action.index+1)];
		case ActionTypes.ADD_FORM:
			return [...state, {}];
		default:
			return state;
	}
}

const messageReducer= (state= [], action) => {
	switch(action.type){
		case ActionTypes.ALERT_MESSAGE:
			return [...state, {message: action.message}];
		default:
			return [];
	}
};
const rootReducer= combineReducers({
	formReducer,
	messageReducer
});

export default rootReducer;