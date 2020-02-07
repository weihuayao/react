import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import MessageList from './MessageList';
import MessageFrom from './MessageFrom';
import "../css/message.css"

export default class MessageBox extends Component {
    constructor  (){
        super();
        this.state = {
            messages:[{username:"trp",content:"天气不错",createAt:new Date()}],
        }
    }

    addMessage = (message)=>{
        let messages = [...this.state.messages,message]
        this.setState({
            messages
        })
    }

    removeMessage = (index)=>{
        this.state.messages.splice(index,1);
        this.setState({
            messages:[...this.state.messages]
        })
    }

    render() {
        return (
            <div className = "container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                         <div className="panel panel-default">
                            <div className="panel-heading"><h1>留言板</h1></div>
                            <div className="panel-body">
                               <MessageList messages = {this.state.messages} removeMessage={this.removeMessage}/>
                            </div>
                            <div className="panel-footer">
                                <MessageFrom addMessage ={this.addMessage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
