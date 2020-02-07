import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css' 
import jsonp from "jsonp"
export default class Suggest extends Component {
    constructor(){
        super();
        this.state = {
            words:[],
            index: -1  //当前选中索引
        };
    }
    handleChange = (event) =>{
        let wd = event.target.value;
        //缓存用户关键字
        this.wd  = wd;
        jsonp(`https://www.baidu.com/su?wd=${wd}`, {
            param:'cb'
        },(err ,data) =>{
            console.log(data)
            this.setState({words:data.s})
        });

    }
    handleKeyDown = (event) =>{
        let code = event.keyCode;
        if(code === 38 || code === 40 ){
            let index = this.state.index;
            if(code === 38){
                index -- ;
                if(index === -2){
                    index = this.state.words.length - 1;
                }
             }else if(code === 40){
                index++;
                if (index === this.state.words.length) {
                    index = -1 ;
                }
            }
            this.setState({index}); 
       }else if(event.keyCode === 13){
        window.location = `https://www.baidu.com/s?wd=${event.target.value}`
    }
    }
 
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input type="text" className="form-control"  value={
                                this.state.index === -1 ? this.wd:this.state.words[this.state.index]
                                }
                                onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {
                                        this.state.words.map((word,index) => (        
                                            <li  key={index} className = {"list-group-item " + ( index === this.state.index ? 'active':'') }> {word} </li>
                                        ))
                                    }   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
