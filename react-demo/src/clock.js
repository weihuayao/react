import React, { Component } from 'react';
class Clock extends React.Component{
  constructor(props){
    super(props)
    this.state = {date:new Date()}
  }

  componentDidMount(){
    this.timerId = setInterval(
      () =>
        this.tick(),
        1000
    )
  }
  componentWillUnmount(){
    clearInterval(this.timerId)
  }
  
  tick() {
    this.setState({
      date:new Date()
    });
  }

  render(){
    return(
      <div>
        <h1>hello </h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }


}
export default Clock;