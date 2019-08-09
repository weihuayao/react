## react生命周期函数
```

import React, { Component } from 'react'

class Counter extends Component {
    constructor() {
        super();
        this.state = { num: 0 };
    }

    handleClick = () => {
        // setState 异步方法 不能在赋值之后立即获取最新的值，可以在回调函数中获取
        this.setState({
            num: this.state.num  + 1
        },()=>{
            console.log(this.state.num);
        })
    };

    componentWillMount(){
        console.log("1,组件挂载之前")
    }

    componentDidMount(){
        console.log("3.组件挂载完成")
    }
    // newProps 新的属性对象   newState新的状态对象
    shouldComponentUpdate(newProps , newState){
        console.log("4.组件是否进行更新")
        if(newState.num % 3 === 0){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(){
        console.log("5.组件将要更新")
    }

    componentDidUpdate(){
        console.log("6.组件更新完成")
    }


    render() {
        console.log("2,组件挂载")
        return (
            <div style={{border:"1px solid red",padding:5}} >
                <p>{this.state.num}</p>
                <button onClick={this.handleClick}>add </button>
                <SubCounter num = {this.state.num}/>
            </div>
        )
    }

}

class SubCounter extends Component{
    //组件接受新的对象
    componentWillReceiveProps(newProps){
        console.log("SubCounter  componentWillReceiveProps ")
    }

    shouldComponentUpdate(newProps, newState){
        if (newProps.num % 2 === 0) {
            return true;
        }else{
            return false;
        }

    }
    render(){
        return(
            <div style={{border:"1px solid blue",padding:5}}>  
            <p>{this.props.num}</p>     
            </div>
        )
    }
}
export default Counter;

```
结果：
1,组件挂载之前
2,组件挂载
3.组件挂载完成
4.组件是否进行更新
 1  
 4.组件是否进行更新
 2
 4.组件是否进行更新
 5.组件将要更新
 2,组件挂载
SubCounter  componentWillReceiveProps 
6.组件更新完成
 3
 
componentWillMount => render  => (子组件中是否更新shouldComponentUpdate =>componentWillReceiveProps )
=> componentDidMount => shouldComponentUpdate 判断是否更新
=> componentWillUpdate =>componentdidUpdate