import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (
    <>  
      <div className="header">
        {/* <h1>The Forest</h1> */}
      </div>
      <div className = "topnav">
        <NavLink to="/" exact={true}>Home</NavLink>
        <br/>
        <NavLink to="/about">About</NavLink>
        <br/>
        <NavLink to="/settings">Settings</NavLink>
        <br/>
        <NavLink to="/login">Login</NavLink>
        <br/>
        <NavLink to="/account">Account</NavLink>
      </div>
    </>
  )
}

export default NavBar