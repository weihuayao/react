import React, { Component } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdd: false,
      addContent: ''
    }
  }

  handleClick () {
    this.setState({
      isAdd: true
    })
  }

  handleChange (e) {
    this.setState({
      addContent: e.target.value
    })
  }

  handleConfirm () {
    if(!this.state.addContent) return
    let item = {
      id: new Date(),
      content: this.state.addContent,
      isComplete: false
    }
    this.props.addItem(item)
    this.setState({
      isAdd: false
    })
  }

  render () {
    let addBtn = <Button type="primary" onClick={this.handleClick.bind(this)}>新增</Button>
    let addComponent = <div style={{display: 'flex'}}>
                        <Input onChange={e => this.handleChange(e)} style={{marginRight: '10px'}}/>
                        <Button type="primary" onClick={this.handleConfirm.bind(this)}>确认</Button>
                      </div>
    let component = this.state.isAdd ? addComponent : addBtn
    return (
      <div style={{marginTop: '10px'}}>
        {component}
      </div>
    )
  }
}

export default Footer;