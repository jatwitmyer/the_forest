import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";

function StartGame( { selectedCharacter, selectedSaveFile } ) {
  const [canProgress, setCanProgress] = useState(true)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [setup, setSetup] = useState("")
  const [choices, setChoices] = useState([])
  const [closer, setCloser] = useState("")
  const [currentEvent, setCurrentEvent]= useState({})
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  const [locations, setLocations] = useState([
    {
      index: 0,
      name: "starting_path",
      src: "assets/starting_path.JPG",
      forward: 1,
      incomplete_events: [
        // {
        //   storage: "incomplete_events",
        //   id: 1,
        //   name: "landslide",
        //   setup: "You've walked on this trail many times before. It's your favorite for clearing your thoughts. Today, you can't get the feeling that your sister's making a mistake out of your head. What will you say to her? How do you know it will reach her?\n\nYou're pulled to the present by the sound of the birds going silent. A chill goes up your spine. From the trail behind you, you hear a low rumble growing, but from what? Is it a rockslide or a moose?",
        //   choices: [
        //     {id: "A", selection: "Leave the path to hide in the forest", setup: "You rush off the trail. Once you reach a hiding spot, you hear tree branches snapping in the distance. A rock slams into the road 50 feet away from you and breaks apart.", choices: [
        //       {id: "A", selection: "Run into the forest away from the rock", closer:"You race into the trees. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and continue forward into the forest. If you go straight, you know you'll reach the edge before sunset."},
        //       {id: "B", selection:"Go back to the road to run away faster", closer:"You race down the trail. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and turn to enter the forest. If you go straight, you know you'll reach the edge before sunset."}
        //     ]},
        //     {id: "B", selection: "Bolt down the trail to put distance between you and the sound", closer: "You race down the trail. You lose your breath and turn back to check on the noise. You hear tree branches snapping in the distance. Behind you, rocks and broken trees begin to fill the path. You're blocked from the exit of the park. It will take hours for the way to be cleared. You sigh and turn to enter the forest. If you go straight, you know you'll reach the edge before sunset."},
        //   ],
        //   achievementId: 1
        // }
      ],
      hidden_events: [],
      completed_events: [],
    }, {
      index: 1,
      src: "assets/portal.jpeg",
      name: 'portal',
      forward: 2,
      incomplete_events: [
      //   {
      //   achievementId: 2,
      //   storage: "incomplete_events",
      //   name: "find_portal",
      //   setup: "What...is this? Such a strange structure... You can faintly hear the sound of a windchime emanating from it.",
      //   choices: [
      //     {selection: "Walk closer.", setup: "As you get close to the stone circle, your mouth falls open. It's the most beautiful thing you've ever seen.", 
      //       choices: [
      //         {selection:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
      //       ]
      //     },
      //     {selection: "Walk around it.", setup: "As you get close to the stone circle, your mouth falls open. It's the most beautiful thing you've ever seen.", 
      //     choices: [
      //       {selection:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
      //     ]
      //   },
      //   {selection: "Walk the other way.", setup: "You turn to leave, but your body is as solid as the stone in front of you. You can't take your eyes away from it.",
      //   choices: [
      //     {selection:"Walk toward the stone circle.", setup: "As you get close, your mouth falls open. It's the most beautiful thing you've ever seen.", 
      //   choices: [
      //     {selection:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
      //   ]}]}
      // ]}
    ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 2,
      src: "assets/spooky1.jpg",
      name: 'spooky1',
      forward: 3,
      incomplete_events: [
      //   {
      //   storage: "incomplete_events",
      //   closer: "What is this place? How did you get here? There's nothing but dark forest everywhere you look."
      // }
    ],
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
      incomplete_events: [
      //   {
      //     name: "meet_the_old_man",
      //     achievementId: null,
      //     storage: "incomplete_events",
      //     setup: "There's a man on the trail ahead of you! He bows his head slightly and raises his hand in greeting. Perhaps he's very friendly or perhaps he can see the worry in your face. He asks if there's anything he can do for you.",
      //     choices: [
      //     {selection: "Where am I?", setup: "Why you're on the edge of the swamp in the Gil'Warren Forest", choices: [
      //       {selection: "Who are you?", setup: "The name's Orin. Pleased to meet you. Now I need to be on my way, but I have something that might be more useful to you than it is to me. Orin hands you a rolled up paper. You unroll it and see a map of Gil'Warren.", choices: [
      //         {selection: "Thank you!", closer:"Good luck to you. Be sure to stick to the paths."},
      //       ]} 
      //     ]},
      //     {selection: "Who are you?", setup: "The name's Orin. Pleased to meet you.", choices: [
      //       {selection: "Where am I?", setup: "Why you're on the edge of the swamp in the Gil'Warren Forest. Now I need to be on my way, but I have something that might be more useful to you than it is to me. Orin hands you a rolled up paper. You unroll it and see a map of Gil'Warren.", choices: [
      //         {selection: "Thank you!", closer:"Good luck to you. Be sure to stick to the paths"}
      //       ]} 
      //     ]}
      // ]}
      ],
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

  // console.log(locations)

  // console.log(selectedSaveFile)
  console.log(currentEvent)

  useEffect(() => {
    setCurrentLocationIndex(selectedSaveFile.location_on_save)
  }, [selectedSaveFile])

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
  }, [locations, currentLocationIndex])
    
  useEffect(() => {
    console.log(currentEvent)
    if (currentEvent.setup) {
      setSetup(currentEvent.setup)
    }
    if (!currentEvent.setup) {
      setSetup("")
    }
    if (currentEvent.closer) {
      setCloser(currentEvent.closer)
      setShowContinueButton(true)
    }
    if (!currentEvent.closer) {
      setCloser("")
    }
    if (currentEvent.choices) {
      setChoices(currentEvent.choices)
    }
    if (!currentEvent.choices) {
      setChoices("")
    }
  }, [currentEvent])

  
  // console.log(currentLocationIndex)

  //---------------------------------------------------------------
  //    movement functions
  //---------------------------------------------------------------
  function left() {
    // console.log(currentLocationIndex)
    if (locations[currentLocationIndex].left) {
      setCurrentLocationIndex(locations[currentLocationIndex].left)
    }
    else {
      console.log("You cannot move left from here")
    }
  }
  function forward() {
    // console.log(currentLocationIndex)
    if (locations[currentLocationIndex].forward) {
      setCurrentLocationIndex(locations[currentLocationIndex].forward)
    }
    else {
      console.log("You cannot move forward from here")
    }
  }
  function right() {
    // console.log(currentLocationIndex)
    if (locations[currentLocationIndex].right) {
      setCurrentLocationIndex(locations[currentLocationIndex].right)
    }
    else {
      console.log("You cannot move right from here")
    }
  }
  function backward() {
    // console.log(currentLocationIndex)
    if (locations[currentLocationIndex].backward !== undefined) {
      setCurrentLocationIndex(locations[currentLocationIndex].backward)
    }
    else {
      console.log("You cannot move backward from here")
    }
  }
  function enter_shop() {
    // console.log(currentLocationIndex)
    if (locations[currentLocationIndex].shop) {
      setCurrentLocationIndex(locations[currentLocationIndex].shop)
    }
    else {
      console.log("You cannot enter_shop from here")
    }
  }
  function exit() {
    // console.log(currentLocationIndex)
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
    // console.log(selection)
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
    // console.log(currentEvent)
    const editing_locations = [...locations]
    console.log(editing_locations)
    if (currentEvent.storage === "incomplete_events") {
      console.log("current event is stored in incomplete events")
      const index = editing_locations[currentLocationIndex].incomplete_events.indexOf(currentEvent)
      const completed_event = editing_locations[currentLocationIndex].incomplete_events.splice(index, index+1)
      // console.log(completed_event)
      // console.log(editing_locations[currentLocationIndex].incomplete_events)
      editing_locations[currentLocationIndex].completed_events.push(completed_event[0])
      setLocations(editing_locations)
    } else if (currentEvent.storage === "hidden_events") {
      // console.log("current event is stored in hidden events")
      const index = editing_locations[currentLocationIndex].hidden_events.indexOf(currentEvent)
      const completed_event = editing_locations[currentLocationIndex].hidden_events.splice(index, index+1)
      // console.log(completed_event)
      // console.log(editing_locations[currentLocationIndex].hidden_events)
      editing_locations[currentLocationIndex].completed_events.push(completed_event[0])
      setLocations(editing_locations)
    }
    setShowContinueButton(false)
    setCanProgress(true)
    setSetup("")
    setCloser("")
    setChoices([])
  }

  //  !!!!  each event must have a storage property to function !!!!
  const event = {
    storage: "",
    name: "",
    setup: "",
    choices: [
      {choice: "", closer: ""},
      {choice: "", setup: "", choices: [
        {choice: "", closer: ""},
        {choice: "", closer: ""}
      ]}]
  }
  const find_portal = {
    storage: "incomplete_events",
    name: "find_portal",
    setup: "What...is this? Such a strange structure... You can faintly hear the sound of a windchime emanating from it.",
    choices: [
      {choice: "Walk closer.", setup: "As you get close to the stone circle, your mouth falls open. It's the most beautiful thing you've ever seen.", 
        choices: [
          {choice:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
        ]
      },
      {choice: "Walk around it.", setup: "As you get close to the stone circle, your mouth falls open. It's the most beautiful thing you've ever seen.", 
      choices: [
        {choice:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
      ]
    },
    {choice: "Walk the other way.", setup: "You turn to leave, but your body is as solid as the stone in front of you. You can't take yours eyes away from it",
    choices: [
      {choice:"Walk toward the stone circle.", setup: "As you get close, your mouth falls open. It's the most beautiful thing you've ever seen.", 
    choices: [
      {choice:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
    ]}]}
  ]}


  const find_girls_item = {
    id: 3,
    storage: "search_events",
    closer: "As you're walking, something catches your eye. Is that...? It is!! You have found Arya's necklace. She will be so grateful. Better put that someplace safe."
  }


  return (
    <>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-6">
          {canProgress && locations[currentLocationIndex].left ? <button onClick={left}>Left</button> : <></>}
          {canProgress && locations[currentLocationIndex].forward ? <button onClick={forward}>Forward</button> : <></>}
          {canProgress && locations[currentLocationIndex].backward !== undefined ? <button onClick={backward}>Backward</button> : <></>}
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