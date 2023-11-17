import React from "react";
import { NavLink } from 'react-router-dom';

function Home() {

  return (
    <>
      <div className="unlogged-nav-bar">
        <NavLink to="/settings" className="nav-icon settings"><i class="fa fa-cog" aria-hidden="true"></i></NavLink>
        <NavLink to="/signup" className="nav-button-filled">Signup</NavLink>
        <NavLink to="/login" className="nav-button-empty">Login</NavLink>
        <NavLink to="/about" className="nav-button-empty">About</NavLink>
        <NavLink to="/" className="nav-button-empty">Home</NavLink>
      </div>
      <div className="title-div"><NavLink to="/start"><h1 className="title">Enter The Forest</h1></NavLink></div>
    </>
  )
}

export default Home