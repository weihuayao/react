import React from 'react';
import { Input, Button, List } from 'antd';
import { connect } from 'react-redux'




const TodoList = (props) => {
  let { inputChange, inputValue, submit, deleteItem, list } = props
  return (
    <div style={{ margin: '10px' }}>
      <div>
        <Input
          style={{ width: '250px', marginRight: '10px' }}
          onChange={inputChange}
          value={inputValue}
        />
        <Button
          type="primary"
          onClick={submit}
        >
          提交
            </Button>
      </div>
      <div style={{ margin: '10px', width: '300px', }}>
        <List
          bordered
          dataSource={list}
          renderItem={(item, index) => (<List.Item key={index}>{item}
            <Button
              type="danger"
              style={{ float: "right", width: "60px", textAlign: "center", marginTop: "-5px" }}
              onClick={() => deleteItem(index)}
            >删除</Button>
          </List.Item>)}
        />
      </div>
    </div>
  );
}
const stateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const dispatchToProps = (dispatch) => {
  return {
    inputChange(event) {
      let action = {
        type: 'change_input',
        value: event.target.value
      }
      dispatch(action)
    },
    submit() {
      let action = { type: 'add_item' }
      dispatch(action)
    },
    deleteItem(index) {
      let action = {
        type: 'delete_item',
        index
      }
      dispatch(action)
    }
  }
}

export default connect(stateToProps, dispatchToProps)(TodoList);