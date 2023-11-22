import React, {useEffect, useState} from "react";
import UserCharacterCard from "./UserCharacterCard"
import Button from "../styles/Button"
import Error from "../styles/Error"
import { useNavigate } from "react-router-dom";

function CharacterSelect( {user, characters, setCharacters, setSelectedCharacter, setInGame, setSelectedSaveFile } ) {
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false)
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  // console.log(user.characters)
  const userCharacterCards = (user.characters.map(character => <UserCharacterCard key={character.id} character={character} setInGame={setInGame} setSelectedCharacter={setSelectedCharacter} setSelectedSaveFile={setSelectedSaveFile}/>))


  function handleNewCharacter(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
    .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((new_character) => {
          console.log(new_character)
          const new_characters = characters
          new_characters.push(new_character)
          setCharacters(new_characters)
          setShowNewCharacterForm(false)
          setSelectedCharacter(new_character)
          // setSelectedSaveFile(new_character.save_files[new_character.save_files.length - 1]) not yet a feature
          setInGame(true)
          navigate('/start')
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    
  }

  return (
    <div className="account">
      <h2>Your Playthroughs</h2>
      {userCharacterCards}
      {showNewCharacterForm === false ? <button onClick={() => setShowNewCharacterForm(true)}>New Playthrough</button> :
      <div className="new-character-form-div">
        <form className="new-character-form" onSubmit={handleNewCharacter}>
          <h2>Choose Your New Character</h2>
          <label>Name:
            <input 
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br/>
          <Button variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Create"}
          </Button>
          <br/>
          {errors.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </form>
      </div>}
    </div>
  )
}

export default CharacterSelect
