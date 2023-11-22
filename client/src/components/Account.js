import React, {useEffect, useState} from "react";
import UserCharacterCard from "./UserCharacterCard"

function Account( {user} ) {
  const [selectedCharacter, setSelectedCharacter] = useState({})
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false)

  console.log(user.characters)
  const userCharacterCards = (user.characters.map(character => <UserCharacterCard key={character.id} character={character} setSelectedCharacter={setSelectedCharacter}/>))

  function createNewCharacter() {
    setShowNewCharacterForm(true)
  }

  return (
    <div className="account">
      <h2>Your Characters</h2>
      {userCharacterCards}
      <br/>
      <button onClick={createNewCharacter}>Create a New Character</button>
    </div>
  )
}

export default Account
