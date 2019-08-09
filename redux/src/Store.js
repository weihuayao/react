import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './Reducer.js';
import mySaga from './Sagas.js';

const sagaMiddleware= createSagaMiddleware();
const loggerMiddleware= createLogger();

const store= createStore(reducer, applyMiddleware(
	sagaMiddleware,
	loggerMiddleware
));

sagaMiddleware.run(mySaga);

export default store;