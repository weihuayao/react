import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';

class Grade extends React.Component{
    render(){
        return(
            <div id="introduction">
                <h1>高级用法</h1>
                <hr/>
                <li><Link to="/" style={{color: "#4183c4"}}>动态路由</Link></li>
                    <li><Link to="/react" style={{color: "#4183c4"}}>路由匹配原理</Link></li>
                    <li><Link to="/react" style={{color: "#4183c4"}}>服务端渲染</Link></li>
                    <li><Link to="/react" style={{color: "#4183c4"}}>模块生命周期</Link></li>
                    <li><Link to="/react" style={{color: "#4183c4"}}>组件外部跳转</Link></li>
            </div>
        )
    }
}
export default Grade;