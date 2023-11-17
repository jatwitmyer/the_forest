import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {
  //check logged
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="unlogged-nav-bar">
      <NavLink to="/settings" className="nav-icon settings"><i class="fa fa-cog" aria-hidden="true"></i></NavLink>
      {loggedIn == false ? 
        <>
          <NavLink to="/signup" className="nav-button-filled">Signup</NavLink> 
          <NavLink to="/login" className="nav-button-empty">Login</NavLink>
        </> :
        <>
           <NavLink to="/logout" exact={true} className="nav-button-empty">Logout</NavLink> {/* redirect to home */}
          <NavLink to="/account" className="nav-button-empty">Account</NavLink>
        </>
      }
      <NavLink to="/about" className="nav-button-empty">About</NavLink>
      <NavLink to="/" exact={true} className="nav-button-empty">Home</NavLink>
    </div>
  )
}

export default NavBar