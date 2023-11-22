import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function NavBar( {user, setUser} ) {
  // console.log(user)

  function logout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {}
    })
    .then(setUser(null))
  }

  return (
    <div className="unlogged-nav-bar">
      <NavLink to="/settings" className="nav-icon settings"><i className="fa fa-cog" aria-hidden="true"></i></NavLink>
      {!user ? 
        <>
          <NavLink to="/signup" className="nav-button-filled">Signup</NavLink> 
          <NavLink to="/login" className="nav-button-empty">Login</NavLink>
        </> :
        <>
          <button to="/" className="nav-button-logout" onClick={logout}>Logout</button> {/* redirect to home */}
          <NavLink to="/account" className="nav-button-empty">Account</NavLink>
        </>
      }
      <NavLink to="/about" className="nav-button-empty">About</NavLink>
      <NavLink to="/" exact={true} className="nav-button-empty">Home</NavLink>
    </div>
  )
}

export default NavBar