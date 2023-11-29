import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar( {user, setUser, inGame, setInGame} ) {
  // console.log(user)
  const navigate = useNavigate()

  function logout() {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {}
    })
    .then(data => {
      setInGame(false)
      setUser(null)
      navigate('/')
    })
  }

  if (inGame) return (
    <div className="unlogged-nav-bar">
      <button to="/" className="nav-button-logout" onClick={logout}>Logout</button>
    </div>
  )

  return (
    <div className="unlogged-nav-bar">
      {/* <NavLink to="/settings" className="nav-icon settings"><i className="fa fa-cog" aria-hidden="true"></i></NavLink> */}
      {!user ? 
        <>
          <NavLink to="/signup" className="nav-button-filled">Signup</NavLink> 
          <NavLink to="/login" className="nav-button-empty">Login</NavLink>
        </> :
        <>
          <button to="/" className="nav-button-logout" onClick={logout}>Logout</button>
          <NavLink to="/account" className="nav-button-empty">Account</NavLink>
        </>
      }
      <NavLink to="/about" className="nav-button-empty">About</NavLink>
      <NavLink end to="/" className="nav-button-empty">Home</NavLink>
    </div>
  )
}

export default NavBar