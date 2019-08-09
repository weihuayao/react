import React, { Component } from 'react';

export const Match = () => (<div id="basis">ROUTER MATCH</div>);
export const Theory = () => (<div id="basis">ROUTER MATCH THEORY</div>);
export const Historypage = () => (<div id="basis">HISTORY</div>);
export const Iroute = () => (<div id="basis">INDEX ROUTE SOMETHING</div>);

export const Basicpage = () => (
	<div id = "basis">
	<h1>基础</h1>
	<hr/>
	<ul>
		<li><a href= '#/basic-routermatch' style={{color: "#4183c4"}} >路由配置</a></li>
		<li><a href= '#/basic-matchtheory' style={{color: "#4183c4"}}>路由配置原理</a></li>
		<li><a href= '#/basic-history' style={{color: "#4183c4"}}>History</a></li>
		<li><a href= '#/basic-indexroute' style={{color: "#4183c4"}}>默认路由</a></li>
	</ul>
	</div>
	);

// class Basic extends Component{
// 	render(){
// 		let child= '';
// 		return {child};
// 	}
// }
// export default Basic;