/*
 * @Descripttion: 
 * @version: 
 * @Author: weihua.yao
 * @Date: 2020-03-25 14:09:14
 * @LastEditTime: 2020-03-25 16:29:19
 */
const defaultState = {
  inputValue: 'jspang',
  list: []
}

export default (state = defaultState, action) => {
  if (action.type === 'change_input') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === 'add_item') {
    if (state.inputValue !== '') {
      let newState = JSON.parse(JSON.stringify(state))
      newState.list.push(newState.inputValue)
      newState.inputValue = ''
      return newState
    }
  }
  if (action.type === 'delete_item') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }

  return state
}