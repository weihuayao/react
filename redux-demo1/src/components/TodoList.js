import React, { Component } from 'react';
import axios from "axios"
import store from '../stroe/index';
// import {CHANGE_INPUT ,ADD_ITEM ,DELETE_ITEM} from '../stroe/actionType'

import {changeInputAction,addItemAction,deleteItemAction} from '../stroe/actionCreators'
import TodoListUi from './TodoListUi';


class TodoList extends Component {
     constructor(props) {
        super(props)
        this.state = store.getState();
       //订阅Redux的状态
       store.subscribe(this.storeChange);
    //    this.ChangeInputValue = this.ChangeInputValue.bind(this);
    //    this.storeChange = this.storeChange.bind(this);
    //    this.handleAddClick =this.handleAddClick.bind(this);
    //    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }
// 请求mock数据
  /* 
    import  getTodoList from './actionType'

    componentDidMount(){
    const action = getTodoList()
    store.dispatch(action)
    })

    }*/
    ChangeInputValue = (event) => {
        const action = changeInputAction(event.target.value)
        store.dispatch(action)
    }

    storeChange = () => {
        this.setState(store.getState())
    }

    handleAddClick = () => {
    const action = addItemAction()
    store.dispatch(action);
    }

    handleDeleteItem = (index) =>{
        const action =  deleteItemAction(index)
        store.dispatch(action)
    }

    

render() {
    return (
        <TodoListUi
            inputValue={this.state.inputValue}
            list={this.state.list}
            ChangeInputValue={this.ChangeInputValue}
            handleAddClick={this.handleAddClick}
            handleDeleteItem={this.handleDeleteItem}
            />
    );
}
}

export default TodoList;