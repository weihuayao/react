import React from "react";
import {BrowserRouter, Route, Link} from 'react-router-dom';
class Basis extends React.Component{
    render(){
        return(
            <div id="basis">
                <h1>基础</h1>
                <hr/>
                <ul>
                    <li><Link to="/set" style={{color: "#4183c4"}}>路由配置</Link></li>
                    <li><Link to="/setway" style={{color: "#4183c4"}}>路由匹配原理</Link></li>
                    <li><Link to="/history1" style={{color: "#4183c4"}}>History</Link></li>
                    <li><Link to="/defaultroute" style={{color: "#4183c4"}} >默认路由(IndexRroute)与IndexLink</Link></li>
                </ul>
            </div>
        )
    }
}
export default Basis;