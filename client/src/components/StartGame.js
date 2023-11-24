import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CharacterCard from "./CharacterCard";
import EventCard from "./EventCard";

function StartGame( { selectedCharacter, selectedSaveFile } ) {
  const [canProgress, setCanProgress] = useState(true)
  const [showContinueButton, setShowContinueButton] = useState(false)

  const tempSaveFile = {
    accepted_quest_village2_trader: "false",
    character_fk: 1,
    datetime_created: "2023-11-15 12:20:00",
    found_girls_item: "false",
    girls_item_location: "village1",
    gold_pieces: 50,
    has_entered_portal: "true",
    has_map: "true",
    has_seeking_spell: "false",
    has_visited_store: "true",
    id: 2,
    location_on_save: "village1",
    met_girl: "true",
    met_village1_trade_target: "false",
    met_village2_trader: "false",
    mini_game_high_score: 10,
    negotiated_deal: "false",
    wizard_is_home: "false"
  }

  // console.log(tempSaveFile)
  // console.log(tempSaveFile.location_on_save)

  //---------------------------------------------------------------
  //    all characters
  //---------------------------------------------------------------
  const wizard = {
    id: 1,
    name: 'wizard',
    src: "assets/wizard.jpg",
    displayName: "Friendly old man",
    interactions: []
  }
  const girl = {
    id: 2,
    const: 'girl',
    src: "assets/girl_crying.jpeg",
    displayName: "Girl",
    interactions: []
  }


  //---------------------------------------------------------------
  //    all events
  //---------------------------------------------------------------
  
  const event = {
    setup: "",
    choices: [
      {choice: "", closer: ""},
      {choice: "", setup: "", choices: [
        {choice: "", closer: ""},
        {choice: "", closer: ""}
      ]}]
  }
  // console.log(event)

  //  !!!!  each event must have storage and id properties to function !!!!
  const landslide = {
    storage: "incomplete_events",
    id: 1,
    setup: "You've walked on this trail many times before. It's your favorite for clearing your thoughts. Today, you can't get the feeling that your sister's making a mistake out of your head. What will you say to her? How do you know it will reach her?\n\nYou're pulled to the present by the sound of the birds going silent. A chill goes up your spine. From the trail behind you, you hear a low rumble growing, but from what? Is it a rockslide or a moose?",
    choices: [
      {id: "A", selection: "Leave the path to hide in the forest", setup: "You rush off the trail. Once you reach a hiding spot, you hear tree branches snapping in the distance. A rock slams into the road 50 feet away from you and breaks apart.", choices: [
        {id: "A", selection: "Run into the forest away from the rock", closer:"You race into the trees. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and continue forward into the forest. If you go straight, you know you'll reach the edge before sunset."},
        {id: "B", selection:"Go back to the road to run away faster", closer:"You race down the trail. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and turn to enter the forest. If you go straight, you know you'll reach the edge before sunset."}
      ]},
      {id: "B", selection: "Bolt down the trail to put distance between you and the sound", closer: "You race down the trail. You lose your breath and turn back to check on the noise. You hear tree branches snapping in the distance. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and turn to enter the forest. If you go straight, you know you'll reach the edge before sunset."},
    ],
    achievementId: 1
  }
  // console.log(landslide) //achievement: lived to tell the tale
  
  const findPortal = {
    storage: "incomplete_events",
    id: 2,
    setup: "You're slowly making your way through the forest when you hear something ahead of you. It sounds like a windchime. ",
    choices: [
      {choice: "text", closer: "text"},
      {choice: "text", setup: "text", choices: [
        {choice: "text", closer: "text"},
        {choice: "text", closer: "text"}
      ]}],
    achievementId: 2
  }
  // console.log(findPortal)
  

  //---------------------------------------------------------------
  //    all locations and their connections
  //---------------------------------------------------------------
  const starting_path = {
    index: 0,
    src: "assets/starting_path.JPG",
    name: "starting_path",
    incomplete_events: [landslide],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const portal = {
    index: 1,
    src: "assets/portal.jpeg",
    name: 'portal',
    backward: starting_path,
    incomplete_events: [findPortal],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const spooky1 = {
    index: 2,
    src: "assets/spooky1.jpg",
    name: 'spook1',
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const spooky2 = {
    index: 3,
    src: "assets/spooky2.jpg",
    name: 'spooky2',
    backward: spooky1,
    characters: [wizard],
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const swamp1 = {
    index: 4,
    src: "assets/swamp1.jpg",
    name: 'swamp1',
    backward: spooky2,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const swamp_village = {
    index: 5,
    src: "assets/swamp_village.jpg",
    name: 'swamp_village',
    backward: swamp1,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const fork = {
    index: 6,
    src: "assets/fork.jpg",
    name: 'fork',
    backward: spooky2,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const cave = {
    index: 7,
    src: "assets/cave.jpeg",
    name: 'cave',
    backward: fork,
    characters: [girl],
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const waterfall_village = {
    index: 8,
    src: "assets/waterfall_village.jpg",
    name: 'waterfall_village',
    backward: cave,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const stairs = {
    index: 9,
    src: "assets/stairs.png",
    name: 'stairs',
    backward: fork,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const tree_village = {
    index: 10,
    src: "assets/tree_village.jpg",
    name: 'tree_village',
    backward: stairs,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
  }
  const shop = {
    index: 11,
    src: "assets/shop.jpeg",
    name: 'shop',
    exit: tree_village,
    incomplete_events: [],
    hidden_events: [],
    completed_events: [],
    was_visited: false
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
  
  const locations = [starting_path, portal, spooky1, spooky2, swamp1, swamp_village, fork, cave, waterfall_village, stairs, tree_village, shop]
  const [currentLocation, setCurrentLocation] = useState(locations[0])

  //---------------------------------------------------------------
  //    movement functions
  //---------------------------------------------------------------
  function left() {
    console.log(currentLocation)
    if (currentLocation.left) {
      setCurrentLocation(locations.find(location => location.name === currentLocation.left.name))
    }
    else {
      console.log("You cannot move left from here")
    }
  }
  function forward() {
    if (currentLocation.forward) {
      setCurrentLocation(locations.find(location => location.name === currentLocation.forward.name))
    }
    else {
      console.log("You cannot move forward from here")
    }
  }
  function backward() {
    // console.log(currentLocation)
    if (currentLocation.backward) {
      setCurrentLocation(locations.find(location => location.name === currentLocation.backward.name))
    }
    else {
      console.log("You cannot move backward from here")
    }
  }
  function right() {
    // console.log(currentLocation)
    if (currentLocation.right) {
      setCurrentLocation(locations.find(location => location.name === currentLocation.right.name))    }
    else {
      console.log("You cannot move right from here")
    }
  }
  function enter_shop() {
    if (currentLocation.shop) {
      setCurrentLocation(locations.find(location => location.name === currentLocation.shop.name))    }
    else {
      console.log("You cannot enter_shop from here")
    }
  }
  function exit() {
    if (currentLocation.exit) {
      setCurrentLocation(locations.find(location => location.name === currentLocation.exit.name))    }
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
  //    render events
  //---------------------------------------------------------------
  
  const [setup, setSetup] = useState("")
  const [choices, setChoices] = useState([])
  const [closer, setCloser] = useState("")
  const [currentEvent, setCurrentEvent]= useState({})

  console.log(currentLocation.incomplete_events)

  useEffect(() => {
    if (currentLocation.incomplete_events.length > 0) {
      setCanProgress(false)
      setCurrentEvent(currentLocation.incomplete_events[0])
      if (currentLocation.incomplete_events[0].setup) {
        setSetup(currentLocation.incomplete_events[0].setup)
      }
      else {
        setSetup("")
      }
      if (currentLocation.incomplete_events[0].closer) {
        setCloser(currentLocation.incomplete_events[0].closer)
        setShowContinueButton(true)
      }
      else {
        setCloser("")
      }
      if (currentLocation.incomplete_events[0].choices) {
        setChoices(currentLocation.incomplete_events[0].choices)
      }
      else {
        setChoices([])
      }
      console.log("use effect triggered")
    }
    else {
      setCurrentEvent({})
    }
  }, [currentLocation])

  function handleSelection(selection) {
    // console.log(currentEvent)
    console.log(selection)
      if (selection.setup) {
        setSetup(selection.setup)
      }
      else {
        setSetup("")
      }
      if (selection.closer) {
        setCloser(selection.closer)
        setShowContinueButton(true)
      }
      else {
        setCloser("")
      }
      if (selection.choices) {
        setChoices(selection.choices)
      }
      else {
        setChoices([])
    }
  }

  // console.log(setup)
  // console.log(closer)
  // console.log(choices)
  
  function completeCurrentEvent() {
    const new_incomplete_events = locations[currentLocation.index].incomplete_events.filter(event => event.id !== currentEvent.id)
    locations[currentLocation.index].completed_events.push(currentEvent)
    locations[currentLocation.index].incomplete_events = new_incomplete_events
    console.log(starting_path)
    setCurrentLocation(locations[currentLocation.index])
    setShowContinueButton(false)
    setCanProgress(true)
    setSetup("")
    setCloser("")
    setChoices([])
  }

  console.log("current location from state", currentLocation)
  

  return (
    <>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-6">
          {/* <img className="location-image" src={currentLocation.src} alt="location"/> */}
          {canProgress && currentLocation.left ? <button onClick={left}>Left</button> : <></>}
          {canProgress && currentLocation.forward ? <button onClick={forward}>Forward</button> : <></>}
          {canProgress && currentLocation.backward ? <button onClick={backward}>Backward</button> : <></>}
          {canProgress && currentLocation.right ? <button onClick={right}>Right</button> : <></>}
          {canProgress && currentLocation.shop ? <button onClick={enter_shop}>Enter Shop</button> : <></>}
          {canProgress && currentLocation.exit ? <button onClick={exit}>Exit</button> : <></>}
          <img className="location-image" src={currentLocation.src} alt="location"/>
        </div>
        <div className="col-6">
          {renderCharacters()}
        </div>
        <div className="col-12 events">
          {setup ? <p>{setup}</p> : <></>}
          {closer ? <p>{closer}</p>: <></>}
          {choices && choices[0] ? <><button onClick={() => handleSelection(choices[0])}>A</button><span> {choices[0].selection}</span></> : <></>}
          {choices && choices[1] ? <><br/><button onClick={() => handleSelection(choices[1])}>B</button><span> {choices[1].selection}</span></> : <></>}
          {choices && choices[2] ? <><br/><button onClick={() => handleSelection(choices[2])}>C</button><span> {choices[2].selection}</span></> : <></>}
          {choices && choices[3] ? <><br/><button onClick={() => handleSelection(choices[3])}>D</button><span> {choices[3].selection}</span></> : <></>}
          {choices && choices[4] ? <><br/><button onClick={() => handleSelection(choices[4])}>E</button><span> {choices[4].selection}</span></> : <></>}
          {showContinueButton ? <button onClick={completeCurrentEvent}>Continue</button> : <></>}
        </div>
      </div>
    </>
  )
}

export default StartGame