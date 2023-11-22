import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserCharacterCard( { character, setSelectedCharacter, setInGame, setSelectedSaveFile } ) {
  let navigate = useNavigate()

  function selectCharacter(history) {
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
        <h3>Name: {character.name}</h3>
        <p>Last Played: {character.datetime_last_played} UTC</p>
        <button onClick={() => selectCharacter(character)}>Select Character</button>
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