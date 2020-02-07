const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');

const app= express();

app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyParser.json());

app.post('/update', function(req, res){
	var data= req.body;
	var flag= true;
	var mes= {};
	if(!/^\d{4}-\d{2}-\d{2}$/.test(data.date1)){
		flag= false
	}
	if(flag){
		mes= {success: true, message: 'save success'};
	}else {
		mes= {success: false, message: 'save failed'};
	}
	res.send(mes);
});

app.get('/', function(req, res){
	res.sendFile('/index.html', {root: __dirname+ '/public'}, function(err){
		if(err){
			console.log('meet an error', err.message);
		}else{
			console.log('send file success');
		}
	});
});

app.listen(8000, ()=> console.log('server is listening'));