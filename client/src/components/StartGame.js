import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CharacterCard from "./CharacterCard";

function StartGame( { mostRecentSave } ) {
  // console.log(mostRecentSave)

  //---------------------------------------------------------------
  //    all characters
  //---------------------------------------------------------------
  const wizard = {
    id: 1,
    src: "assets/wizard.jpg",
    name: "Friendly old man",
    interactions: []
  }
  const girl = {
    id: 2,
    src: "assets/girl_crying.jpeg",
    name: "Girl",
    interactions: []
  }


  //---------------------------------------------------------------
  //    all events
  //---------------------------------------------------------------

  const landslide = {
    setup: "You've taken a walk on this trail many times before. It's your favorite for clearing your head. Today, you can't get the feeling that your sister's making a mistake out of your head. What will you say to her? How do you know it will reach her?\n\nYou're pulled out of your thoughts by the sound of the birds going silent. A chill goes up your spine. From the trail behind you, you hear a low rumble growing, but from what? Is it a rockslide or a moose?",
    choices: [
      {choice: "A. Leave the path to hide in the forest", setup: "You rush off the trail. Once you reach a hiding spot, you hear tree branches snapping in the distance. A rock slams into the road 50 feet away from you and breaks apart.", choices: [{choice: "A. Run into the forest away from the rock", closer:"You race into the trees. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and continue forward into the forest. If you go straight, you know you'll reach the edge before sunset."}, {choice:"B. Go back to the road to run away faster.", closer:"You race down the trail. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and turn to enter the forest. If you go straight, you know you'll reach the edge before sunset."}]},
      {choice: "B. Bolt down the trail to put distance between you and the sound", closer: "You race down the trail. You lose your breath and turn back to check on the noise. You hear tree branches snapping in the distance. A rock slams into the road 80 feet away from you and breaks apart. You race down the trail. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and turn to enter the forest. If you go straight, you know you'll reach the edge before sunset."},
    ]
  }
  console.log(landslide)

  const event = {
    setup: "",
    choices: [{choice: "", closer: ""}]
  }
  console.log(event)
  
  
  
  //---------------------------------------------------------------
  //    all locations and their connections
  //---------------------------------------------------------------

  const starting_path = {
    src: "assets/starting_path.JPG",
    events: [landslide] 
  }
  const portal = {
    src: "assets/portal.jpeg",
    backward: starting_path
  }
  const spooky1 = {
    src: "assets/spooky1.jpg"
  }
  const spooky2 = {
    src: "assets/spooky2.jpg",
    backward: spooky1,
    characters: [wizard]
  }
  const swamp1 = {
    src: "assets/swamp1.jpg",
    backward: spooky2
  }
  const swamp_village = {
    src: "assets/swamp_village.jpg",
    backward: swamp1
  }
  const fork = {
    src: "assets/fork.jpg",
    backward: spooky2
  }
  const cave = {
    src: "assets/cave.jpeg",
    backward: fork,
    characters: [girl]
  }
  const waterfall_village = {
    src: "assets/waterfall_village.jpg",
    backward: cave
  }
  const stairs = {
    src: "assets/stairs.png",
    backward: fork
  }
  const tree_village = {
    src: "assets/tree_village.jpg",
    backward: stairs
  }
  const shop = {
    src: "assets/shop.jpeg",
    exit: tree_village
  }
    
  starting_path.forward = portal
  portal.forward = spooky1
  spooky1.forward = spooky2
  spooky2.forward = fork
  spooky2.right = swamp1
  swamp1.forward = swamp_village
  fork.left = cave
  cave.forward = waterfall_village
  fork.right = stairs
  stairs.forward = tree_village
  tree_village.shop = shop
  
  const [currentLocation, setCurrentLocation] = useState({
    src: "assets/starting_path.JPG",
    forward: portal
  })

  function left() {
    console.log(currentLocation)
    if (currentLocation.left) {
      setCurrentLocation(currentLocation.left)
    }
    else {
      console.log("You cannot move left from here")
    }
  }
  function forward() {
    if (currentLocation.forward) {
      setCurrentLocation(currentLocation.forward)
    }
    else {
      console.log("You cannot move forward from here")
    }
  }
  function backward() {
    // console.log(currentLocation)
    if (currentLocation.backward) {
      setCurrentLocation(currentLocation.backward)
    }
    else {
      console.log("You cannot move backward from here")
    }
  }
  function right() {
    // console.log(currentLocation)
    if (currentLocation.right) {
      setCurrentLocation(currentLocation.right)    }
    else {
      console.log("You cannot move right from here")
    }
  }
  function enter_shop() {
    if (currentLocation.shop) {
      setCurrentLocation(currentLocation.shop)    }
    else {
      console.log("You cannot enter_shop from here")
    }
  }
  function exit() {
    if (currentLocation.exit) {
      setCurrentLocation(currentLocation.exit)    }
    else {
      console.log("You cannot exit from here")
    }
  }

  //---------------------------------------------------------------
  //    render characters
  //---------------------------------------------------------------
  function renderCharacters() {
    if (currentLocation.characters) {
      // console.log(currentLocation.characters)
      const cards = currentLocation.characters.map(character => <CharacterCard character={character} key={character.id}/>)
      return cards
    }
  }

  
  //---------------------------------------------------------------
  //    all descriptions
  //---------------------------------------------------------------

  return (
    <>
      <NavBar/>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-6">
          {/* <img className="location-image" src={currentLocation.src} alt="location"/> */}
          {currentLocation.left ? <button onClick={left}>Left</button> : <></>}
          {currentLocation.forward ? <button onClick={forward}>Forward</button> : <></>}
          {currentLocation.backward ? <button onClick={backward}>Backward</button> : <></>}
          {currentLocation.right ? <button onClick={right}>Right</button> : <></>}
          {currentLocation.shop ? <button onClick={enter_shop}>Enter Shop</button> : <></>}
          {currentLocation.exit ? <button onClick={exit}>Exit</button> : <></>}
          <img className="location-image" src={currentLocation.src} alt="location"/>
        </div>
        <div className="col-6">
          {renderCharacters()}
        </div>
      </div>
    </>
  )
}

export default StartGame