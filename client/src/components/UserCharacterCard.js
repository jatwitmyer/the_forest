import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function UserCharacterCard( { character, characters, setCharacters, setSelectedCharacter, setInGame, setSelectedSaveFile } ) {
  let navigate = useNavigate()
  const [showDeleteVerification, setShowDeleteVerification] = useState(false)

  function selectCharacter() {
    // console.log("character selected", character)
    setSelectedCharacter(character)
    setSelectedSaveFile(character.save_files[character.save_files.length - 1])
    setInGame(true)
    navigate('/start')
  }

  function handleDelete() {
    fetch(`/characters_by_id/${character.id}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
      body: {}
    })
    .then(data => {
      console.log("delete successful")})
    setShowDeleteVerification(false)
    setCharacters(characters.filter(item => item.id !== character.id))
  }

  if (character) {
    // console.log(character)
    return (
      <div className="user-character-card-div">
        <p>Name: {character.name}</p>
        <p>Last Played: {character.datetime_last_played} UTC</p>
        <button className='submit' onClick={selectCharacter}>Select Character</button>
        <button className="submit red" onClick={() => setShowDeleteVerification(true)}>Delete Character</button>
        {showDeleteVerification? <div>
        <p>Are you sure you wish to delete this playthrough?</p>
        <button className='submit red' onClick={handleDelete}>Delete</button>
        <button className='submit' onClick={() => setShowDeleteVerification(false)}>Cancel</button>
        </div> : <></>}
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