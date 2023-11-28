import React, { useEffect, useState, useContext, createContext } from "react";
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import Login from "./Login";
import Account from "./Account";
import Signup from "./Signup";
import StartGame from "./StartGame";
import NavBar from "./NavBar";
import CharacterSelect from "./CharacterSelect";


export const SaveFileContext = createContext({
  location_on_save: 0,
  has_entered_portal: "false",
  has_map: "false",
  met_girl: "false",
  girls_item_location: "stairs",
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

export function App() {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState({})
  const [selectedSaveFile, setSelectedSaveFile] = useState({
      location_on_save: 0,
      has_entered_portal: "false",
      has_map: "false",
      met_girl: "false",
      girls_item_location: "stairs",
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
  const [inGame, setInGame] = useState(false)


  console.log(selectedSaveFile)

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((u) => {
          setUser(u)
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch('characters')
    .then(r => r.json())
    .then(data => {
      setCharacters(data)
    })
  }, [user])

  if (!user) {
    return (
    <div className="App">
      <NavBar user={user}/>
      <Routes>
        <Route exact path="/" element={<Home user={user}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/login" element={<Login onLogin={setUser}/>} />
        <Route path="/signup" element={<Signup setUser={setUser}/>} />
      </Routes>

    </div>
  );}

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} inGame={inGame} setInGame={setInGame}/>
      <Routes>
        <Route exact path="/" element={<Home user={user} setInGame={setInGame} characters={characters} setCharacters={setCharacters} setSelectedCharacter={setSelectedCharacter} setSelectedSaveFile={setSelectedSaveFile}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/account" element={<Account user={user} setUser={setUser}/>} />
        <Route path="/character_select" element={<CharacterSelect  user={user} setInGame={setInGame} characters={characters} setCharacters={setCharacters} setSelectedCharacter={setSelectedCharacter} setSelectedSaveFile={setSelectedSaveFile}/>} />
        <Route path="/start" element={
          <SaveFileContext.Provider value={selectedSaveFile}>
            <StartGame selectedCharacter={selectedCharacter} setSelectedSaveFile={setSelectedSaveFile}/>
          </SaveFileContext.Provider>
        } />
      </Routes>
    </div>
  );
}

export default App;
