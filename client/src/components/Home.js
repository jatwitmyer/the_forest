import React from "react";
import { NavLink } from 'react-router-dom';

function Home( { user } ) {

  return (
    <>
      <div className="title-div">
        <h1 className="title">Welcome to The Forest</h1>
        <div className="start-button-container">
          {user? <NavLink className="start-button" to="/character_select">START GAME</NavLink> : <></> }
        </div>
      </div>
    </>
  )
}

export default Home