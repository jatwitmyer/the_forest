import React, { useEffect, useState } from "react";
import '../App.css';
import { Switch, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import Login from "./Login";
import Account from "./Account";
import Signup from "./Signup";
import StartGame from "./StartGame";
import NavBar from "./NavBar";
import Logout from "./Logout"


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);



  if (!user) {
    return (
    <div className="App">
      <NavBar user={user}/>
      <Switch>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/settings">
          <Settings/>
        </Route>
        <Route path="/login">
          <Login onLogin={setUser}/>
        </Route>
        <Route path="/signup">
          <Signup onLogin={setUser}/>
        </Route>
      </Switch>

    </div>
  );}


    


//commented all of this out ->


  // const [charactersByUser, setCharactersByUser] = useState([])
  // // console.log("charactersByUser", charactersByUser)
  // const [saveFilesByCharacter, setSaveFilesByCharacter] = useState([])
  // // console.log("saveFilesByCharacter", saveFilesByCharacter)
  
  // //get user id after authentication
  // const user_id = 1 //temporary hard-coding
  
  // //get all characters by user
  // useEffect(() => {
  //   fetch(`/characters_by_user/${user_id}`)
  //   .then(r => r.json())
  //   .then(characters_by_user => {
  //     setCharactersByUser(characters_by_user)
  //   })
  // }, [])

  // //select a character
  // const character_id = 1 //temporary hard-coding

  // //get most recent save file by character id
  // useEffect(() => {
  //   fetch(`/save_files_by_character/${character_id}`)
  //   .then(r => r.json())
  //   .then(save_files_by_character => {
  //     setSaveFilesByCharacter(save_files_by_character) //this returns all save files for the character
  //   })
  // }, [])
  // let mostRecentSave = "not fetched yet"
  // if (saveFilesByCharacter[saveFilesByCharacter.length -1] !== undefined) {
  //   mostRecentSave = saveFilesByCharacter[saveFilesByCharacter.length -1]
  // }

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/">
          <Home user={user}/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/settings">
          <Settings/>
        </Route>
        <Route path="/logout">
          <Logout setUser={setUser} user={user}/>
        </Route>
        <Route path="/account">
          <Account user={user}/>
        </Route>
        <Route path="/start">
          <StartGame/>
        </Route>
        {/* <Route path="/start">
          <StartGame mostRecentSave={mostRecentSave}/>
        </Route> */}
      </Switch>

    </div>
  );
}

export default App;
