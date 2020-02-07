import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './Reducer.js';
import mySaga from './Sagas.js';

import App from './components/app.js';
require('./css/style.css');

const sagaMiddleware= createSagaMiddleware();
const loggerMiddleware= createLogger();

const store= createStore(reducer, applyMiddleware(
	sagaMiddleware,
	loggerMiddleware
));

sagaMiddleware.run(mySaga);

render(
<Provider store= {store}>
	<App />
</Provider>, document.getElementById('root'));