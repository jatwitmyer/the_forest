import React from "react";
import { NavLink } from 'react-router-dom';
import NavBar from "./NavBar";

function Home( { user } ) {

  return (
    <>
      <div className="title-div">
        <h1 className="title">Welcome to The Forest</h1>
        <div className="start-button-container">
          {user? <NavLink className="start-button" to="/start">START GAME</NavLink> : <></> }
        </div>
      </div>
    </>
  )
}

export default Home