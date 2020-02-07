import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/public.css';
import {Basicpage, Match, Theory, Historypage, Iroute} from './components/basic.js';

const Indexpage = () => (<div>INDEX PAGE</div>);

const Introduction = () => (<div>INTRODUCTION PAGE</div>);


class Index extends Component{
	constructor(){
		super();
		this.state={
			route: window.location.hash.substr(1)
		}
	}

	componentDidMount(){
		window.addEventListener('hashchange', ()=>{
			this.setState({
				route: window.location.hash.substr(1)
			});
		});
	}

	render() {
		let child= null;
		switch(this.state.route){
			case '/index':
				child= <Indexpage />;
				break;
			case '/introduction':
				child= <Introduction />;
				break;
			case '/basic':
				child= <Basicpage />;
				break;
			case '/basic-routermatch':
				child= <Match />;
				break;
			case '/basic-matchtheory':
				child= <Theory />;
				break;
			case '/basic-history':
				child= <Historypage />;
				break;
			case '/basic-indexroute':
				child= <Iroute />;
				break;
			default: 
				child= <Indexpage />
				break;
		}
		return (
			<div>
				<div id="wrapper">
                    <div className="App">
                    <h3><a href= '#/index'>Introduction</a></h3>
					<ol>
						<li><a href= '#/introduction'>简介</a></li>
						<li><a href= '#/basic'>基础</a></li>
							<ul id="list">
								<li><a href= '#/basic-routermatch'>路由配置</a></li>
								<li><a href= '#/basic-matchtheory'>路由配置原理</a></li>
								<li><a href= '#/basic-history'>History</a></li>
								<li><a href= '#/basic-indexroute'>默认路由</a></li>
							</ul>	
					</ol>
                    </div>
				</div>
				<div id="componnetbox">
					{child}
				</div>
            </div>
		)
	}
}
export default Index;
ReactDOM.render(<Index />, document.getElementById("root"))