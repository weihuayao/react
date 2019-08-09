import React, { Component } from 'react';
import TodoItem from './TodoItem'
import { List } from 'antd';

class DataList extends Component {
  deleteItem (id) {
    this.props.deleteItem(id)
  }

  changeItem (id) {
    this.props.changeItem(id)
  }

  render () {
    let data = this.props.list
    return (
      <List
        bordered
        dataSource={data}
        renderItem={item => (
            <List.Item>
              <TodoItem deleteItem={id => this.deleteItem(id)} changeItem={id => this.changeItem(id)} {...item}/>
            </List.Item>
        )}
      />
    )
  }
}

export default DataList;