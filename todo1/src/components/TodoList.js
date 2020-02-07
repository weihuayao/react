import React, { Component } from 'react';
import { Layout } from 'antd';
import Form from './From';
import DataList from './DataList';
import Footer from './Footer';
import data from '../data/data.js'
import '../css/todoList.less'

const { Header, Content} = Layout;

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }
  // 加载数据
  componentDidMount () {
    this.setState({
      list: data
    })
  }
//删除
  deleteItem (id) {
    let deleteIndex = data.findIndex(item => {
      return item.id === id
    })
    data.splice(deleteIndex, 1)
    this.setState({
      list: data
    })
  }

  changeItem (id) {
    let changeIndex = data.findIndex(item => {
      return item.id === id
    })
    data[changeIndex].isComplete = !data[changeIndex].isComplete
    this.setState({
      list: data
    })
  }
//查找
  handleSearchItem(value) {
    let newList = data.filter(item => {
      return item.content.indexOf(value) !== -1
    })
    this.setState({
      list: newList
    })
  }
// 添加
  addItem (item) {
    data.push(item)
    this.setState({
      list: data
    })
  }

  render () {
    return (
      <Layout className="todolist-layout">
        <Header>
        <h3 className="logo">TodoList</h3>
        </Header>
        <Content className="todolist-content">
          <Form searchItem={value => this.handleSearchItem(value)}></Form>
          <DataList list={this.state.list} deleteItem={id => this.deleteItem(id)} changeItem={id => this.changeItem(id)}></DataList>
          <Footer addItem={item => this.addItem(item)}></Footer>
        </Content>
      </Layout>
    )
  }
}

export default TodoList;