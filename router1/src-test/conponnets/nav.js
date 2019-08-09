import  React, { Component } from 'react'
import  { NavLink } from "react-router-dom"
import "../css/nav.css";

const NavBar = () =>(
    <div  className="nav">
    <NavLink  className=""          exact  to="/">Home </NavLink> || 
    <NavLink  className= "active"   exact  to="/About">About </NavLink> ||
    <NavLink  className= "active"   exact  to="/InBox/NM$L/WDNMD">InBox </NavLink> ||
    <NavLink  className= "active"   exact  to="/react"> 404 </NavLink> || 
    <NavLink to='/redirect'  ClassName='active'>Redirect</NavLink>
</div>
)
    
  
export default NavBar;