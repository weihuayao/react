import { call, put, takeEvery} from 'redux-saga/effects';
//import fetchApi from './Myfetch.js';

export function* saveData(action){
	const myfetch= function(data){
		let url= 'http://localhost:8000/update';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((rowRes)=> {
			if(rowRes.ok){
				return rowRes.json();
			}
			throw Error(rowRes.statusText);
		}).then((data)=>{
			return data;
		}).catch((e)=>{
			console.log(e.message);
		});
	};
	try{
		const result= yield call(myfetch, action.data);
		yield put({type: 'ALERT_MESSAGE', message: result.message});
	}catch(e) {
		yield put({type: 'ALERT_MESSAGE', message: 'save failed'});
	}
}

function* mySaga() {
	yield takeEvery('SAVE_FORM', saveData);
}

export default mySaga;