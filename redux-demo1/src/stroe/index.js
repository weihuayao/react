import { createStore } from 'redux'
import reducer from "./reducer"
/*
import { createStore , applyMiddleware ,compose } from 'redux' 
import thunk from 'redux-thunk'
*/


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) //创建数据存储仓库

/*
const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore( reducer, enhancer) 
 */
export default store;