import React, { useEffect, useState } from "react";
import '../App.css';
import { Switch, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Settings from "./Settings";
import Login from "./Login";
import Account from "./Account";
import NavBar from "./NavBar";


function App() {
  const [users, setUsers] = useState([])
  console.log(users)
  const userId = 1

  //get all users
  useEffect(() => {
    fetch("/users")
    .then(r => r.json())
    .then(users => {
      // console.log(users)
      setUsers(users)
    })
  }, [])

  //get all of a user's save files
  useEffect(() => {
    fetch(`/save_files/${userId}`)
    .then(r => r.json())
    .then(users => {
      // console.log(users)
      setUsers(users)
    })
  }, [])

  return (
    <div className="App">
      <NavBar/>
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
        <Route path="/account">
          <Account/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
