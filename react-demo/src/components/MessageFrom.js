import React, { Component } from 'react'

export default class MessageFrom extends Component {
   
   handleSubmit = (event)=>{
        event.preventDefault();
        
       // 获取输入的值
       let username  = this.username.value;
       let content   = this.content.value;

       this.props.addMessage({username,content,createAt:new Date()});

   }
   
   
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <div className="form-group">
                    <label className="control-label" htmlFor="username">用户名:</label>
                    <input  ref = { x =>this.username = x}  className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="content" className="control-label">内容:</label>
                    <input ref = { x =>this.content = x} className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">发表</button>
                </div>
            </form>
        )
    }
}
