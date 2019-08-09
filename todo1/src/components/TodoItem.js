    
import React, { Component } from 'react';
import { Typography, Button } from 'antd';
import '../css/todoItem.less'

const { Text } = Typography;

class TodoItem extends Component {
  handleDeleteItem (id) {
    this.props.deleteItem(id)
  }

  handleChangeItem (id) {
    this.props.changeItem(id)
  }

  render () {
    let {content, isComplete, id} = this.props
    return (
      <div className="item-container" onDoubleClick={() => this.handleChangeItem(id)} style={{cursor: 'pointer'}}>
        <Text delete={isComplete}>{content}</Text>
        <Button type="primary" icon="delete" onClick={() => this.handleDeleteItem(id)}></Button>
      </div>
    )
  }
}

export default TodoItem;