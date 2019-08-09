import React, { Component } from 'react'
import {Prompt} from 'react-router-dom'; 

export default class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            power: false 
        }
        this.changPower = this.changPower.bind(this);
    }

    changPower(){
        alert("已开启");
        this.setState({
            power: true
        })
    }

    render() {
        return (
            <div>
                关于  -> WDNMD
                <Prompt message="NM$L?" when={this.state.power}></Prompt>
                <button onClick = {this.changPower}>启用</button>
            </div>
        )
    }
}
