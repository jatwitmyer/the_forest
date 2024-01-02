import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserCharacterCard( { character, setSelectedCharacter, setInGame, setSelectedSaveFile } ) {
  let navigate = useNavigate()

  function selectCharacter() {
    // console.log("character selected", character)
    setSelectedCharacter(character)
    setSelectedSaveFile(character.save_files[character.save_files.length - 1])
    setInGame(true)
    navigate('/start')
  }

  if (character) {
    // console.log(character)
    return (
      <div className="user-character-card-div">
        <p>Name: {character.name}</p>
        <p>Last Played: {character.datetime_last_played} UTC</p>
        <button className='submit' onClick={selectCharacter}>Select Character</button>
        <p>------------------------------------------------------</p>
      </div>
    )
  }
  else {
    return (
      <></>
    )
  }
  
}

export default UserCharacterCard