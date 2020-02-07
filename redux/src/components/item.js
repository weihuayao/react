import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../Action.js';

class Item extends Component{
	constructor(){
		super();
		this.state= {
			education: '',
			school: '',
			date1: '',
			date2: '',
			major1: '',
			GPA1: '',
			top: '',
			major2: '',
			GPA2: ''
		};
	}
	componentDidUpdate(prevProps){
		if(!prevProps.isSave&& this.props.isSave){
			this.props.changeSave();
			if(this.handleConfirm()){
				this.props.actions.Save(this.state);
			}else{
				this.props.actions.Alert('SAVE FAILED!! comfirm failed');
			}
		}
	}
	handleConfirm(){
		let {education, school, date1, date2, major1, GPA1, top, GPA2}= this.state;
		let startTime = Date.parse(date1)
		let endTime = Date.parse(date1)
		if(!education|| !school|| !major1){
			return false;
		}else if(!/^\d{4}-\d{2}-\d{2}$/.test(date1)|| !/^\d{4}-\d{2}-\d{2}$/.test(date2)){
			return false;
		}else if(startTime<endTime){
			return false;
		}else if(!/^\d+\.\d+$/.test(GPA1) && test(GPA1)> 4.0){
			return false;
		}else if(!/^\d+%$/.test(top)){
			return false;
		}else if(GPA2.length!== 0&& !/^\d+\.\d+$/.test(GPA2&& test(GPA1)> 4.0)){
			return false;
		}else{
			return true;
		}
	}
	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleDelete(e){
		e.preventDefault();
		this.props.actions.Delete(this.props.id-1);
	}
	handleSubmit(e){
		e.preventDefault();
		return false;
	}
	render() {
		return (
			<form className= 'item'>
				<fieldset onSubmit= {(e)=> this.handleSubmit(e)}>
					<button className= 'delete-item' onClick= {this.handleDelete.bind(this)}>删除</button>
					<legend>教育经历</legend>
					<label><span>*</span>教育阶段</label><div><input type="text" name="education" value= {this.state.education} onChange= {(e)=> this.handleChange(e)} required /></div><br />
					<label><span>*</span>学校</label><div><input type="text" name="school" value= {this.state.school} onChange= {(e)=> this.handleChange(e)} required /></div><br />
					<label><span>*</span>起止时间</label><div><input type="text" name="date1" value= {this.state.date1} onChange= {(e)=> this.handleChange(e)} required pattern= '^\d{4}-\d{2}-\d{2}$' placeholder= 'eg: 2015-09-12' /><label>至<span>*</span></label><input type="text" name="date2" value= {this.state.date2} onChange= {(e)=> this.handleChange(e)} required pattern= '^\d{4}-\d{2}-\d{2}$' placeholder= 'eg: 2015-09-12' /></div><br />
					<label><span>*</span>第一学位专业</label><div><input type="text" name="major1" value= {this.state.major1} onChange= {(e)=> this.handleChange(e)} required /></div><br />
					<label><span>*</span>第一学位GPA</label><div><input type="text" name="GPA1" value= {this.state.GPA1} onChange= {(e)=> this.handleChange(e)} required pattern= '^\d+\.\d+$' placeholder='eg: 2.867' /></div><br />
					<label><span>*</span>第一学位排名</label><div><input type="text" name="top" value= {this.state.top} onChange= {(e)=> this.handleChange(e)} required placeholder='eg: 20%' pattern= '^\d+%$' /></div><br />
					<label>第二学位专业</label><div><input type="text" name="major2" value= {this.state.major2} onChange= {(e)=> this.handleChange(e)} /></div><br />
					<label>第二学位GPA</label><div><input type="text" name="GPA2" value= {this.state.GPA2} onChange= {(e)=> this.handleChange(e)} pattern= '^\d+\.\d+$' placeholder='eg: 2.867'  /></div>
					<br className="end" />
				</fieldset>
			</form>	
		);
	}
}

function mapDispatchToProps(dispatch){
	return { actions: bindActionCreators(actions, dispatch)};
}
export default connect(null, mapDispatchToProps)(Item);