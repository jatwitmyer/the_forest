import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar( {user, setUser} ) {
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
      setUser(null)
      navigate('/')
    })
  }

  return (
    <div className="unlogged-nav-bar">
      <button to="/" className="nav-button-logout" onClick={logout}>Logout</button> {/* redirect to home */}
    </div>
  )
}

export default NavBar