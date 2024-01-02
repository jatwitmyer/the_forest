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

  function saveGame() {
    console.log("save game")
  }

  if (inGame) return (
    <div className="nav-bar">
      {/* <button to="/" onClick={logout}>Logout</button> */}
      <NavLink end to="/" onClick={() => setInGame(false)}>Save and Exit</NavLink>
      <button onClick={saveGame}>Save Game</button>
    </div>
  )

  return (
    <div className="nav-bar">
      {/* <NavLink to="/settings" className="nav-icon settings"><i className="fa fa-cog" aria-hidden="true"></i></NavLink> */}
      {!user ? 
        <>
          <NavLink to="/signup" >Signup</NavLink> 
          <NavLink to="/login" >Login</NavLink>
        </> :
        <>
          <button to="/" onClick={logout}>Logout</button>
          <NavLink to="/account" >Account</NavLink>
        </>
      }
      {/* <NavLink to="/about" >About</NavLink> */}
      <NavLink end to="/" >Home</NavLink>
    </div>
  )
}

export default NavBar