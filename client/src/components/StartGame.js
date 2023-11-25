import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";

function StartGame( { selectedCharacter, selectedSaveFile } ) {
  const [canProgress, setCanProgress] = useState(true)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [setup, setSetup] = useState("")
  const [choices, setChoices] = useState([])
  const [closer, setCloser] = useState("")
  const [currentEvent, setCurrentEvent]= useState({})
  
  //  !!!!  each event must have storage and id properties to function !!!!
  // const event = {
  //   setup: "",
  //   choices: [
  //     {choice: "", closer: ""},
  //     {choice: "", setup: "", choices: [
  //       {choice: "", closer: ""},
  //       {choice: "", closer: ""}
  //     ]}]
  // }

  const [locations, setLocations] = useState([
    {
      index: 0,
      name: "starting_path",
      src: "assets/starting_path.JPG",
      forward: 1,
      incomplete_events: [
        {
          storage: "incomplete_events",
          id: 1,
          name: "landslide",
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
      ],
      hidden_events: [],
      completed_events: [],
    }, {
      index: 1,
      src: "assets/portal.jpeg",
      name: 'portal',
      backward: 0,
      forward: 2,
      incomplete_events: [{
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
      }],
      hidden_events: [],
      completed_events: []
    }, {
      index: 2,
      src: "assets/spooky1.jpg",
      name: 'spooky1',
      forward: 3,
      incomplete_events: [],
      hidden_events: [],
      completed_events: [],
    }, {
      index: 3,
      src: "assets/spooky2.jpg",
      name: 'spooky2',
      backward: 2,
      forward: 6,
      right: 4,
      characters: [{
        id: 1,
        name: 'wizard',
        src: "assets/wizard.jpg",
        displayName: "Friendly old man",
        interactions: []
      }],
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 4,
      src: "assets/swamp1.jpg",
      name: 'swamp1',
      backward: 3,
      forward: 5,
      incomplete_events: [],
      hidden_events: [],
      completed_events: [],
    }, {
      index: 5,
      src: "assets/swamp_village.jpg",
      name: 'swamp_village',
      backward: 4,
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 6,
      src: "assets/fork.jpg",
      name: 'fork',
      backward: 3,
      left: 7,
      right: 9,
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 7,
      src: "assets/cave.jpeg",
      name: 'cave',
      backward: 6,
      forward: 8,
      characters: [
        {
          id: 2,
          name: 'girl',
          src: "assets/girl_crying.jpeg",
          displayName: "Girl",
          interactions: []
        }
      ],
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 8,
      src: "assets/waterfall_village.jpg",
      name: 'waterfall_village',
      backward: 7,
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 9,
      src: "assets/stairs.png",
      name: 'stairs',
      backward: 6,
      forward: 10,
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 10,
      src: "assets/tree_village.jpg",
      name: 'tree_village',
      backward: 9,
      shop: 11,
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }, {
      index: 11,
      src: "assets/shop.jpeg",
      name: 'shop',
      exit: 10,
      incomplete_events: [],
      hidden_events: [],
      completed_events: []
    }
  ])

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  console.log(locations)

  console.log(selectedSaveFile)
  //set current location on startup to the location where the player was during the save
  // console.log(selectedSaveFile.location_on_save)
  // console.log(locations.find(location => location.name === selectedSaveFile.location_on_save).index)


  useEffect(() => {
    setCurrentLocationIndex(selectedSaveFile.location_on_save)
  }, [])

  useEffect(() => {
    if (locations[currentLocationIndex].incomplete_events.length > 0) {
      setCanProgress(false)
      setCurrentEvent(locations[currentLocationIndex].incomplete_events[0])
    } else {
      setCanProgress(true)
      setCurrentEvent({})
      setSetup("")
      setCloser("")
      setChoices([])
    }
  }, [currentLocationIndex])
    
  useEffect(() => {
    // if (locations) {
      if (locations[currentLocationIndex].incomplete_events.length > 0) { 
        if (locations[currentLocationIndex].incomplete_events[0].setup) {
          setSetup(locations[currentLocationIndex].incomplete_events[0].setup)
        } else {
          setSetup("")
        }
        
        if (locations[currentLocationIndex].incomplete_events[0].closer) {
          setCloser(locations[currentLocationIndex].incomplete_events[0].closer)
          setShowContinueButton(true)
        } else {
          setCloser("")
        }
    
        if (locations[currentLocationIndex].incomplete_events[0].choices) {
          setChoices(locations[currentLocationIndex].incomplete_events[0].choices)
        } else {
        setChoices([])
        }
      } else {
        console.log("there are no incomplete events at this location")
      }
    // }
  }, [currentEvent, currentLocationIndex])
  
  console.log(currentLocationIndex)


  //---------------------------------------------------------------
  //    movement functions
  //---------------------------------------------------------------
  function left() {
    console.log(currentLocationIndex)
    if (locations[currentLocationIndex].left) {
      setCurrentLocationIndex(locations[currentLocationIndex].left)
    }
    else {
      console.log("You cannot move left from here")
    }
  }
  function forward() {
    console.log(currentLocationIndex)
    if (locations[currentLocationIndex].forward) {
      setCurrentLocationIndex(locations[currentLocationIndex].forward)
    }
    else {
      console.log("You cannot move forward from here")
    }
  }
  function right() {
    console.log(currentLocationIndex)
    if (locations[currentLocationIndex].right) {
      setCurrentLocationIndex(locations[currentLocationIndex].right)
    }
    else {
      console.log("You cannot move right from here")
    }
  }
  function backward() {
    console.log(currentLocationIndex)
    if (locations[currentLocationIndex].backward) {
      setCurrentLocationIndex(locations[currentLocationIndex].backward)
    }
    else {
      console.log("You cannot move backward from here")
    }
  }
  function enter_shop() {
    console.log(currentLocationIndex)
    if (locations[currentLocationIndex].shop) {
      setCurrentLocationIndex(locations[currentLocationIndex].shop)
    }
    else {
      console.log("You cannot enter_shop from here")
    }
  }
  function exit() {
    console.log(currentLocationIndex)
    if (locations[currentLocationIndex].exit) {
      setCurrentLocationIndex(locations[currentLocationIndex].exit)
    }
    else {
      console.log("You cannot exit from here")
    }
  }

  //---------------------------------------------------------------
  //    render characters
  //---------------------------------------------------------------
  function renderCharacters() {
    if (locations[currentLocationIndex].characters) {
  //     // console.log(locations[currentLocationIndex].characters)
      const cards = locations[currentLocationIndex].characters.map(character => <CharacterCard character={character} key={character.id}/>)
      return cards
    }
  }



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
    // const new_incomplete_events = locations[locations[currentLocationIndex].index].incomplete_events.filter(event => event.id !== currentEvent.id)
    // locations[locations[currentLocationIndex].index].completed_events.push(currentEvent)
    // locations[locations[currentLocationIndex].index].incomplete_events = new_incomplete_events
    // console.log(starting_path)
    // setlocations[currentLocationIndex](locations[locations[currentLocationIndex].index])
    setShowContinueButton(false)
    setCanProgress(true)
    setSetup("")
    setCloser("")
    setChoices([])
  }

  // console.log("current location from state", locations[currentLocationIndex])

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

  const find_girls_item = {
    id: 3,
    storage: "search_events",
    closer: "As you're walking, something catches your eye. Is that...? It is!! You have found Arya's necklace. She will be so grateful. Better put that someplace safe."
  }

  useEffect(() => {
    // setCurrentLocation(selectedSaveFile.location_on_save)
    // console.log()
  }, [])
  
  console.log(currentLocationIndex)
  if (locations[currentLocationIndex].backward) {
    console.log("you can go backward")
  } else {
    console.log("can't go back")
  }
  
  return (
    <>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-6">
          {canProgress && locations[currentLocationIndex].left ? <button onClick={left}>Left</button> : <></>}
          {canProgress && locations[currentLocationIndex].forward ? <button onClick={forward}>Forward</button> : <></>}
          {canProgress && locations[currentLocationIndex].backward ? <button onClick={backward}>Backward</button> : <></>}
          {canProgress && locations[currentLocationIndex].right ? <button onClick={right}>Right</button> : <></>}
          {canProgress && locations[currentLocationIndex].shop ? <button onClick={enter_shop}>Enter Shop</button> : <></>}
          {canProgress && locations[currentLocationIndex].exit ? <button onClick={exit}>Exit</button> : <></>}
          <img className="location-image" src={locations[currentLocationIndex].src} alt="location"/>
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