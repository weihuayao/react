import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../Action.js';
import Item from './item.js';
import AlertMessage from './alert.js';

class App extends Component{
	constructor(){
		super();
		this.state={
			isSave: false
		};
	}
	handleAdd(){
		this.props.actions.Add();
	}
	handleSave(){
		//console.log(this.state.isSave);
		this.setState((state)=>({
			isSave: !state.isSave
		}));
	}
	handleCancel(){

	}
	render() {
		let adds= this.props.list.length=== 0? null: this.props.list.map((item, index)=>{
			return <Item key= {index} id= {index+ 1} isSave= {this.state.isSave} changeSave= {this.handleSave.bind(this)} />;
		});
		return (
			<div id= 'main-body'>
				<Item id= {0} isSave= {this.state.isSave} changeSave= {this.handleSave.bind(this)} />
				{adds}
				<div className= 'add-panel' onClick= {()=> this.handleAdd()}>+ 添加教育经历</div>
				<div className= 'btns'>
					<button name= 'save' onClick= {()=> this.handleSave()}>保存并提交</button>
					<button name= 'cancel' onClick= {()=> this.handleCancle()}>取消</button>
				</div>
				<AlertMessage mes= {this.props.message.length=== 0? '': this.props.message[0].message} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		list: state.formReducer,
		message: state.messageReducer
	};
}
function mapDispatchToProps(dispatch){
	return { actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);