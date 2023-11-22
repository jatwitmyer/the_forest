import React from "react";

function UserCharacterCard( { character, setSelectedCharacter } ) {
  function selectCharacter() {
    console.log("character selected", character)
    setSelectedCharacter(character)
  }

  if (character) {
    console.log(character)
    return (
      <div className="user-character-card-div">
        <h3>{character.name}</h3>
        <p>{character.datetime_last_played}</p>
        <button onClick={() => selectCharacter(character)}>Select Character</button>
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