import React, {Component} from 'react';

class AlertMessage extends Component{

	componentDidUpdate(){
		if(this.props.mes.length!== 0){
			var alert= document.getElementById('alert-message');
			alert.style.display= 'block';
			alert.style.right= 0;
			setTimeout(()=>{
				alert.style.right= -212+ 'px';
				alert.style.display= 'none';
			}, 3000);
		}
	}
	render(){
		var alert= null;
		if(this.props.mes.length!== 0){
			alert= <section id= 'alert-message'>{this.props.mes}</section>;
		}
		return alert;
	}
}

export default AlertMessage;