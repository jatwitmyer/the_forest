import React from "react";

function CharacterCard( { character } ) {
  return (
    <div >
      <h3 className="character-name">{character.displayName}</h3>
      <img className="character-image" key={character.id} src={character.src} alt={character.name}/>
    </div>
  )
}

export default CharacterCard