import React, { useEffect, useState } from "react";
import '../App.css';
import { Switch, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import Login from "./Login";
import Account from "./Account";
// import NavBar from "./NavBar";
import Signup from "./Signup";
import StartGame from "./StartGame";


function App() {
  const [charactersByUser, setCharactersByUser] = useState([])
  // console.log("charactersByUser", charactersByUser)
  const [saveFilesByCharacter, setSaveFilesByCharacter] = useState([])
  // console.log("saveFilesByCharacter", saveFilesByCharacter)
  const [finishedFetches, setFinishedFetches] = useState(false)
  
  //get user id after authentication
  const user_id = 1 //temporary hard-coding
  
  //get all characters by user
  useEffect(() => {
    fetch(`/characters_by_user/${user_id}`)
    .then(r => r.json())
    .then(characters_by_user => {
      setCharactersByUser(characters_by_user)
    })
  }, [])


  //select a character
  const character_id = 1 //temporary hard-coding

  //get most recent save file by character id
  useEffect(() => {
    fetch(`/save_files_by_character/${character_id}`)
    .then(r => r.json())
    .then(save_files_by_character => {
      setSaveFilesByCharacter(save_files_by_character) //this returns all save files for the character
    })
  }, [])
  const mostRecentSave = saveFilesByCharacter[saveFilesByCharacter.length -1]
  console.log(mostRecentSave)

  //declare starting path
  const starting_path = {
    src: "",
    description: "",
    characters: [],
    items: [],
    interactions: []
  }
  // console.log(starting_path)

  //declare portal
  const portal = {
    src: "",
    description: "",
    backward: starting_path,
    characters: [],
    items: [],
    interactions: []
  }
  // console.log(starting_path)

  //connect locations declared previously to the portal
  starting_path.forward = portal

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/settings">
          <Settings/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/account">
          <Account/>
        </Route>
        <Route path="/start">
          <StartGame/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
