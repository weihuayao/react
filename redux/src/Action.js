import * as ActionTypes from './ActionTypes.js';

export const Save= (formData) => ({
	type: ActionTypes.SAVE_FORM,
	data: formData
});

export const Delete= (index) => ({
	type: ActionTypes.DELETE_FORM,
	index: index
});

export const Add= () => ({
	type: ActionTypes.ADD_FORM
});

export const Alert= (mes) => ({
	type: ActionTypes.ALERT_MESSAGE,
	message: mes
});