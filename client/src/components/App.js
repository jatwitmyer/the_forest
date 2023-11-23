import React, { useEffect, useState } from "react";
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


function App() {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState({})
  const [selectedSaveFile, setSelectedSaveFile] = useState({})
  const [inGame, setInGame] = useState(false)

  // console.log(selectedSaveFile)

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setCharacters(user.characters)
        });
      }
    });
  }, []);

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
        <Route path="/start" element={<StartGame selectedCharacter={selectedCharacter} selectedSaveFile={selectedSaveFile}/>} />
      </Routes>
    </div>
  );
}

export default App;
