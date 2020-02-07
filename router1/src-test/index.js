import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route , Switch , Redirect} from 'react-router-dom';
import Home from './conponnets/Home';
import About from './conponnets/About';
import NavBar from './conponnets/nav';
import Error from './conponnets/Error';
import InBox from './conponnets/InBox';
 
ReactDOM.render(
    <Router basename="demo" forceRefresh={true}>
        <div>
         <NavBar/>
            <Switch>
                <Route  exact  path="/"  component={Home} />
                <Route  path="/About" component={About} />
                <Route  path="/InBox/:param/:a" component={InBox} />
                <Redirect   from="/redirect"  to= "/About"/>
                <Route  component={Error} />
            </Switch>
            
        </div>
    </Router>,
    document.getElementById("root")
);