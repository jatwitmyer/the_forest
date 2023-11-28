import React, {useState} from "react";
import UserCharacterCard from "./UserCharacterCard"
import { useNavigate } from "react-router-dom";


function CharacterSelect( {user, characters, setCharacters, setSelectedCharacter, setInGame, setSelectedSaveFile } ) {
  const [showNewCharacterForm, setShowNewCharacterForm] = useState(false)
  const [name, setName] = useState('')

  const navigate = useNavigate()

  // console.log(user.characters)
  const userCharacterCards = (characters.map(character => <UserCharacterCard key={character.id} character={character} setInGame={setInGame} setSelectedCharacter={setSelectedCharacter} setSelectedSaveFile={setSelectedSaveFile}/>))

  const girls_item_location_choices = ['spooky1', 'spooky2', 'swamp1', 'swamp_village', 'fork', 'waterfall_village', 'stairs', 'tree_village', 'shop']

  function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }

  function handleNewCharacter(e) {
    e.preventDefault();
    fetch("/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
    .then((r) => {
      if (r.ok) {
        console.log("new character post successful")
        r.json().then((new_character) => {
          console.log(new_character)

          const editing_characters = [...characters]
          editing_characters.push(new_character)
          setCharacters(editing_characters)
          setSelectedCharacter(new_character)
          
          fetch(`/save_files_by_character/${new_character.id}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              location_on_save: 0,
              has_entered_portal: "false",
              has_map: "false",
              met_girl: "false",
              girls_item_location: randomChoice(girls_item_location_choices),
              found_girls_item: "false",
              has_visited_store: "false",
              gold_pieces: 0,
              has_seeking_spell: "false",
              mini_game_high_score: 0,
              met_village2_trader: "false",
              accepted_quest_village2_trader: "false",
              met_village1_trade_target: "false",
              negotiated_deal: "false",
              wizard_is_home: "false"
            })  
          })
          .then((resp) => {
          if (resp.ok) {
            console.log("new save file post successful")
            resp.json().then((new_save) => {
              console.log(new_save)
              setSelectedSaveFile(new_save)
            })}
          else {
            console.log("new save file post NOT successful")
            resp.json().then(console.log(resp));
            }})

          setShowNewCharacterForm(false)
          // setSelectedSaveFile(new_character.save_files[new_character.save_files.length - 1]) not yet a feature
          setInGame(true)
          setName('')
          console.log(e.target)
          navigate('/start')
        });
      } else {
        console.log("new character post NOT successful")
        r.json().then((data) => console.log(data));
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
          <input type="submit" name="submit" value="Submit"/>
        </form>
      </div>}
    </div>
  )
}

export default CharacterSelect
