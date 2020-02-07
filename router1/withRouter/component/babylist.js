import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';


class BabyList extends React.Component{
    render(){
        return(
            <div>
                <ul>
            <li><Link to="/set">2.1.路由配置</Link></li>
            <li><Link to="/setway">2.2.路由匹配原理</Link></li>
            <li><Link to="/history1">2.3.History</Link></li>
            <li><Link to="/defaultroute">2.4.默认路由(IndexRroute)与IndexLink</Link></li> 
          </ul>
            </div>
        )
    }
}
export default BabyList
;