import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/public.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Basis from './component/basis';
import Grade from './component/grade';
import Introduction from './component/introduction';
import BabyList from './component/babylist';
import Error from './component/error'
import * as serviceWorker from './serviceWorker';

function RouterConfig() {
    return <h3>路由配置是一组指令，用来告诉 router 如何匹配
    URL以及匹配后如何执行代码。我们来通过一个简单的例子解释一
  下如何编写路由配置。</h3>
}
function RouterConfigWhy() {
    return <h3>React Router 使用路由嵌套的概念来让你定义
    view 的嵌套集合，当一个给定的 URL 被调用时，整个集合中
    （命中的部分）都会被渲染。嵌套路由被描述成一种树形结构。
    React Router 会深度优先遍历整个路由配置来寻找一个与给
  定的 URL 相匹配的路由。</h3>
}
function History1() {
    return <h3>React Router 是建立在 history 之上的。
    简而言之，一个 history 知道如何去监听浏览器地址栏的变化
    ，并解析这个 URL 转化为 location 对象， 然后 router
  使用它匹配到路由，最后正确地渲染对应的组件。</h3>
}
function DefaultRoute() {
    return <h3>在解释 默认路由(IndexRoute) 的用例之前，我
  们来设想一下，一个不使用默认路由的路由配置是什么样的：</h3>
}
class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            list1: "",
            status: true
        }
        this.addlist = this.addlist.bind(this)

    }

    addlist() {
        if (this.state.status == true) {
            this.setState({ list1: <BabyList />, status: false })
        } else {
            this.setState({ list1: "", status: true })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div id="wrapper">
                    <div className="App">
                        <h3>
                            Introduction
       </h3>
                        <ol>
                            <li><Link to="/introduction">简介</Link></li>
                            <li><Link to="/basis" onClick={this.addlist}>基础</Link>
                                <ul id="list">
                                    {this.state.list1}
                                </ul>
                            </li>
                            <li><Link to="/grade">高级用法</Link></li>
                        </ol>

                    </div>
                    <div id="componnetbox">
                        <Switch>
                            <Route path="/introduction" component={Introduction}></Route>
                            <Route path="/basis" component={Basis}></Route>
                            <Route path="/grade" component={Grade}></Route>
                            <Route path="/set" component={RouterConfig}></Route>
                            <Route path="/setway" component={RouterConfigWhy}></Route>
                            <Route path="/history1" component={History1}></Route>
                            <Route path="/defaultroute" component={DefaultRoute}></Route>
                            <Route  component={Error} />
                        </Switch>
                    </div>
                </div>

            </BrowserRouter>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById("root"))
serviceWorker.unregister();
