/*
 * @Descripttion: 
 * @version: 
 * @Author: weihua.yao
 * @Date: 2020-03-25 14:05:36
 * @LastEditTime: 2020-03-25 15:28:43
 */
import {
  createStore
} from 'redux'

import reducer from './reducer'

const store = createStore(reducer)


export default store