import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TodoList from "./components/TodoList" 

ReactDOM.render(<TodoList />, document.getElementById('root'));


serviceWorker.unregister();
