import React, { Component } from 'react'
import "../css/message.css"

export default class MessageList extends Component {
    render() {
        return (
            <ul className="list-group">
                {
                    this.props.messages.map((messages, index) => (
                        <li className="list-group-item" key={index}> 
                            {messages.username}:{messages.content}
                             <button className="btn btn-danger btn-xs" onClick={()=>this.props.removeMessage(index)}>删除</button>
                            <span className="pull-right">{messages.createAt.toLocaleString()} </span>
                        </li>))
                }
            </ul>
        )
    }
}
