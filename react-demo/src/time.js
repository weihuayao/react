import React from 'react';
import ReactDOM from 'react-dom';


function Tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
   return element;
  }
  
  setInterval(Tick, 1000);
  
  export default Tick;