##  Redux中间件

![1564804376651](C:\Users\ywh\AppData\Roaming\Typora\typora-user-images\1564804376651.png)

###  Redux-thunk插件配置

```javascript
 安装 thunk
 
 npm install --save redux-thunk

在store 中 添加 
import { createStore , applyMiddleware ,compose } from 'redux' 
import thunk from 'redux-thunk'

官方api
const store = createStore(
    reducer,
    applyMiddleware(thunk)
) 

//由于createStore只能接受两个参数 所以使用增强函数 
const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore( reducer, enhancer) 


```

### saga

```javascript
安装  saga

npm install --save sago

store/index.js
import { createStore , applyMiddleware ,compose } from 'redux'  
//  引入createStore方法
import reducer from './reducer'   
import createSagaMiddleware from 'redux-saga'   //引入saga
import mySagas from './sagas' 

const sagaMiddleware = createSagaMiddleware();   //创建saga中间件

const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))


const store = createStore( reducer, enhancer) // 创建数据存储仓库
sagaMiddleware.run(mySagas)//运行 saga


export default store   //暴露出去

// TodoList.js
// add 
componentDidMount(){
    const action =getMyListAction()
    store.dispatch(action)
    console.log(action)
}

// actionTypes.js
//add
export const  GET_MY_LIST = 'getMyList'

//actionCreators.js
//add 
export const getMyListAction = ()=>({
    type:GET_MY_LIST
})

创建 saga.js

function* mySaga() {} 

import { takeEvery ,put } from 'redux-saga/effects'  
import {GET_MY_LIST} from './actionTypes'
import {getListAction} from './actionCreatores'
import axios from 'axios'

//generator函数
function* mySaga() {
    //等待捕获action
    yield takeEvery(GET_MY_LIST, getList)
}

function* getList(){
    //这段代码我就不删除了。
    // axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
    //     const data = res.data
    //     const action = getListAction(data)
    //     put(action)
        
    // })
    const res = yield axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    const action = getListAction(res.data)
    yield put(action)
}
  
export default mySaga;




```

### react-redux

 

