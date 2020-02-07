import {CHANGE_INPUT , ADD_ITEM , DELETE_ITEM, GET_LIST} from './actionType'

const defaultValue = { 
    inputValue : 'Write Something',
    list:[
        '早上4点起床，锻炼身体',
        '中午下班游泳一小时'
    ]
}

export default (state  = defaultValue,action) => {
  //  console.log(state , action)
  //reducer 只能接受state ，不能改变state
  if(action.type === CHANGE_INPUT){
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if(action.type ===ADD_ITEM){
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = ''
    return newState
  }
  if(action.type ===DELETE_ITEM){
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index ,1);
    return newState;
  }  
  // 获取mock数据
  // if(action.type === GET_LIST ){ //根据type值，编写业务逻辑
  //   let newState = JSON.parse(JSON.stringify(state)) 
  //   newState.list = action.data.data.list //复制性的List数组进去
  //   return newState
  // }

    return state;
};