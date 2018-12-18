import React, { Component } from 'react';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      educationValue : 'C',
      schoolValue    : 'A'
    };
  }
  render() {
    return (
      <div>
      <h1 style={{fontSize:'20px' , marginLeft:'400px',fontWeight:'bold'}}>教育经历</h1>
      <form >
      <lable style={{marginLeft:'650px'}}><a style={{color:'red'}}>*</a>教育阶段:<select style={{width:'200px' ,height:'30px',marginLeft:'10px'}} defaultValue={this.state.educationValue} ref="education">
                            <option value="A">中专</option>
                            <option value="B">大专</option>
                            <option value="C">本科</option>
                            <option value="D">硕士及以上</option>
      </select>
      </lable><br/><br/>

      <lable style={{marginLeft:'662px',}}><a style={{color:'red'}}>*</a>学校:
      <select style={{width:'200px' ,height:'30px',marginLeft:'30px'}} defaultValue={this.state.schoolValue} ref="school">
                            <option value="A">北京理工大学</option>
                            <option value="B">江西财经大学</option>
                            <option value="C">江西理工大学</option>
                            <option value="D">五道口技校</option>      
      </select>
      </lable><br/><br/>

      <lable style={{marginLeft:'650px'}}><a style={{color:'red'}}>*</a>起止时间:
      <input  style={{width:'120px',marginLeft:'10px',height:'20px'}} placeholder  = "2018-12-18" name = 'startTime' type='text'></input><a>至</a>
      <input style={{width:'120px',marginLeft:'10px',height:'20px'}} placeholder  = "2018-12-20" name = 'endTime' type='text'></input>
      </lable><br/><br/>
     
      <lable style={{marginLeft:'620px'}}><a style={{color:'red'}}>*</a>第一学位专业:
      <input style={{width:'200px',marginLeft:'10px',height:'20px'}} name='fristMajor' type='text'></input>
   
      </lable>
      <lable style={{marginLeft:'80px'}}><a style={{color:'red'}}>*</a>第一学位GPA:
      <input style={{width:'200px',marginLeft:'10px',height:'20px'}} name='fristScore' type='text'></input>
      
      </lable><br/><br/>

      <lable style={{marginLeft:'620px'}}><a style={{color:'red'}}>*</a>第一学位排名:
      <input style={{width:'200px',marginLeft:'10px',height:'20px'}} name='fristRank' type='text'></input>
      </lable><br/><br/>


      <lable style={{marginLeft:'630px'}}>第二学位专业:
      <input style={{width:'200px',marginLeft:'10px',height:'20px'}} name='secondMajor' type='text'></input>
     
      </lable>
      <lable style={{marginLeft:'80px'}}>第二学位GPA:
      <input style={{width:'200px',marginLeft:'10px',height:'20px'}} name='secondScore' type='text'></input>
      </lable><br/><br/>

            <button style={{marginLeft:'700px',width:'100px',height:'30px',color:'blue'} }onClick = {this.handleBtnClick}>提交 </button>
            <button style={{marginLeft:'100px',width:'100px',height:'30px',color:'blue'} }onClick = {this.handleBtnClick}>取消 </button>
      </form>
      
      </div>
    );
  }
}

export default App;
