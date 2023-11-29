import React, { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { SaveFileContext } from "./App.js"

export default function StartGame( { selectedCharacter, setSelectedSaveFile } ) {
  // console.log(selectedCharacter)
  const selectedSaveFile = React.useContext(SaveFileContext)
  console.log(selectedSaveFile)
  
  const [canProgress, setCanProgress] = useState(true)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const [setup, setSetup] = useState("")
  const [choices, setChoices] = useState([])
  const [closer, setCloser] = useState("")
  const [currentEvent, setCurrentEvent]= useState({})
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  const [hasMap, setHasMap] = useState(false)
  const [foundGirlsItem, setFoundGirlsItem] = useState(false)
  const [showNecklace, setShowNecklace] = useState(false)
  const [showPortal, setShowPortal] = useState(false)
  const [oldManIsThere, setOldManIsThere] = useState(true)
  const [aryaIsThere, setAryaIsThere] = useState(true)
  const [zoomIn, setZoomIn] = useState(false)
  const [zoomedImage, setZoomedImage] = useState(<img class="map-image" src="assets/map.jpg" alt="Map of Gil'Warren Forest."/>)
  const [finished, setFinished] = useState(false)
  const [locations, setLocations] = useState([   //  !!!!  each event must have a storage property to function !!!!
    {
      index: 0,
      displayName: "Starting Path",
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
      displayName: "Portal",
      src: "assets/portal.jpeg",
      name: 'portal',
      forward: 2,
      incomplete_events: [
        {
        achievementId: 2,
        storage: "incomplete_events",
        name: "find_portal",
        setup: "What...is this? Such a strange structure... You can faintly hear the sound of a windchime emanating from it.",
        choices: [
          {selection: "Walk closer.", setup: "As you get close to the stone circle, your mouth falls open. It's the most beautiful thing you've ever seen.", 
            choices: [
              {selection:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
            ]
          },
          {selection: "Walk around it.", setup: "As you get close to the stone circle, your mouth falls open. It's the most beautiful thing you've ever seen.", 
          choices: [
            {selection:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
          ]
        },
        {selection: "Walk the other way.", setup: "You turn to leave, but your body is as solid as the stone in front of you. You can't take your eyes away from it.",
        choices: [
          {selection:"Walk toward the stone circle.", setup: "As you get close, your mouth falls open. It's the most beautiful thing you've ever seen.", 
        choices: [
          {selection:"Step into the circle.", closer: "As you step into the circle, all you can hear is your heartbeat in your ears and your vision goes dark."}
        ]}]}
      ]}
    ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 2,
      displayName: "Forest's Edge",
      src: "assets/spooky1.jpg",
      name: 'spooky1',
      forward: 3,
      incomplete_events: [
        {
        storage: "incomplete_events",
        closer: "What is this place? How did you get here? There's nothing but dark forest everywhere you look."
      }
    ],
      hidden_events: [],
      completed_events: [],
    }, {
      index: 3,
      displayName: "Rokk Path",
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
        {
          name: "meet_the_old_man",
          achievementId: null,
          storage: "incomplete_events",
          setup: "There's a man on the trail ahead of you! He bows his head slightly and raises his hand in greeting. Perhaps he's very friendly or perhaps he can see the worry in your face. He asks if there's anything he can do for you.",
          choices: [
          {selection: "Where am I?", setup: "Why you're on the edge of the swamp in the Gil'Warren Forest", choices: [
            {selection: "Who are you?", setup: "The name's Orin. Pleased to meet you. Now I need to be on my way, but I have something that might be more useful to you than it is to me. Orin hands you a rolled up paper. You unroll it and see a map of Gil'Warren.", choices: [
              {selection: "Thank you!", closer:"Good luck to you. Be sure to stick to the paths."},
            ]} 
          ]},
          {selection: "Who are you?", setup: "The name's Orin. Pleased to meet you.", choices: [
            {selection: "Where am I?", setup: "Why you're on the edge of the swamp in the Gil'Warren Forest. Now I need to be on my way, but I have something that might be more useful to you than it is to me. Orin hands you a rolled up paper. You unroll it and see a map of Gil'Warren.", choices: [
              {selection: "Thank you!", closer:"Good luck to you. Be sure to stick to the paths"}
            ]} 
          ]}
      ]}
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 4,
      displayName: "Gil'Warren Swamp",
      src: "assets/swamp1.jpg",
      name: 'swamp1',
      backward: 3,
      forward: 5,
      incomplete_events: [
        {
          name: "boardwalk",
          storage: "incomplete_events",
          achievementId: null,
          closer: "A boardwalk stretches in front of you through the swamp. To your left, an alligator comes up for air and stares from afar as you pass."
        }
      ],
      hidden_events: [],
      completed_events: [],
    }, {
      index: 5,
      displayName: "Rokk",
      src: "assets/swamp_village.jpg",
      name: 'swamp_village',
      backward: 4,
      incomplete_events: [
        {
          storage: "incomplete_events",
          achievementId: null, 
          closer: "You can hear music coming from inside the houses and no one outside on the paths. You wonder if this is a regular occurence."
        }
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 6,
      displayName: "Crossroads",
      src: "assets/fork.jpg",
      name: 'fork',
      backward: 3,
      left: 7,
      right: 9,
      incomplete_events: [
        {
          storage: "incomplete_events",
          achievementId: null,
          closer: "You're so grateful to feel the sun on your face again. This stream must be the source of the water that's been on the path behind you. The main trail continues off to your right and a smaller one follows the river. Which way should you go?"
        }
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 7,
      displayName: "Leira's Cave",
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
      incomplete_events: [
        {
          name:"meet_arya",
          storage: "incomplete_events",
          achievementId: null,
          setup: "As you approach the cave, you hear the sound of water being kicked up by footseps. You see a girl with tears on her face looking down into the water as she wades through it. What do you say to her?",
          choices: [
            {selection: "Hey, what's wrong?", setup: `She looks up at you, startled, and wipes a tear from her face. "I've lost my mother's necklace. I have to find it or she'll be devastated."`, choices: [
              {selection: "Where's the last place you had it?", setup: "I was wearing it this morning when I left the house, but it could be anywhere by now. I've been making deliveries for the shopkeeper in Ardua all day. I couldn't possibly look everywhere by sundown.", choices:[
                {selection: "I'll help you find it", closer: "Oh thank you! It's a greenish blue stone wrapped in copper wire. My name is Arya, by the way. Thank you again."},
                {selection: "I'll let you know if I see it, but I'm in a hurry to get home to my sister.", closer: "I understand. Good luck! If you do get the chance to look, it's a greenish blue stone wrapped in copper wire. My name is Arya, by the way."}
              ]},
              {selection: "Do you need some help?", setup:"Oh please. I was wearing it this morning when I left the house, but it could be anywhere by now. I've been making deliveries for the shopkeeper in Ardua all day. I couldn't possibly look everywhere by sundown.", choices:[
                {selection: "I'll help you find it", closer: "Oh thank you! It's a greenish blue stone wrapped in copper wire. My name is Arya, by the way. Thank you again."},
                {selection: "I'll let you know if I see it, but I'm in a hurry to get home to my sister.", closer: "I understand. Good luck! If you do get the chance to look, it's a greenish blue stone wrapped in copper wire. My name is Arya, by the way."}
              ]},
            ]},
            {selection: 'Are you okay?', setup: `She looks up at you, startled, and wipes a tear from her face. "No...I'm not. I've lost my mother's necklace. I have to find it or she'll be devastated."`, choices: [
              {selection: "Where's the last place you had it?", setup: "I was wearing it this morning when I left the house, but it could be anywhere by now. I've been making deliveries for the shopkeeper in Ardua all day. I couldn't possibly look everywhere by sundown.", choices:[
                {selection: "I'll help you find it", closer: "Oh thank you! It's a greenish blue stone wrapped in copper wire. My name is Arya, by the way. Thank you again."},
                {selection: "I'll let you know if I see it, but I'm in a hurry to get home to my sister.", closer: "I understand. Good luck! If you do get the chance to look, it's a greenish blue stone wrapped in copper wire. My name is Arya, by the way."}
              ]},
              {selection: "Do you need some help?", setup:"Oh please. I was wearing it this morning when I left the house, but it could be anywhere by now. I've been making deliveries for the shopkeeper in Ardua all day. I couldn't possibly look everywhere by sundown.", choices:[
                {selection: "I'll help you find it", closer: "Oh thank you! It's a greenish blue stone wrapped in copper wire. My name is Arya, by the way. Thank you again."},
                {selection: "I'll let you know if I see it, but I'm in a hurry to get home to my sister.", closer: "I understand. Good luck! If you do get the chance to look, it's a greenish blue stone wrapped in copper wire. My name is Arya, by the way."}
              ]},
            ] },
            {selection: "Do you need some help?", setup: `She looks up at you, startled, and wipes a tear from her face. "Yes! Please. I've lost my mother's necklace. I have to find it or she'll be devastated."`, choices: [
              {selection: "Where's the last place you had it?", setup: "I was wearing it this morning when I left the house, but it could be anywhere by now. I've been making deliveries for the shopkeeper in Ardua all day. I couldn't possibly look everywhere by sundown.", choices:[
                {selection: "I'll help you find it", closer: "Oh thank you! It's a greenish blue stone wrapped in copper wire. My name is Arya, by the way. Thank you again."},
                {selection: "I'll let you know if I see it, but I'm in a hurry to get home to my sister.", closer: "I understand. Good luck! If you do get the chance to look, it's a greenish blue stone wrapped in copper wire. My name is Arya, by the way."}
              ]},
            ]},
          ]
        }
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 8,
      displayName: "Evanthi",
      src: "assets/waterfall_village.jpg",
      name: 'waterfall_village',
      backward: 7,
      incomplete_events: [
        {
          name:"see_waterfall_village",
          storage: "incomplete_events",
          achievementId: null,
          closer: "Spray from the waterfall lingers in the air here, and birds call to each other from their roosts atop houses." 
        }
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 9,
      displayName: "Stone Stairway",
      src: "assets/stairs.png",
      name: 'stairs',
      backward: 6,
      forward: 10,
      incomplete_events: [
        {
          name: "find_stairs",
          storage: "incomplete_events",
          achievementId: null,
          closer: "The steps are wet, so you climb them carefully. The chatter of the forest blends together around you." 
        }
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 10,
      displayName: "Ardua",
      src: "assets/tree_village.jpg",
      name: 'tree_village',
      backward: 9,
      shop: 11,
      incomplete_events: [
        {
          name: "find_stairs",
          storage: "incomplete_events",
          achievementId: null,
          closer: "At last you see why you climbed alllll of those steps. The forest floor is far below now and there's a whole village up here in the canopy. The map tells you that this is Ardua. A sign at the start of the bridge invites you to visit the shop: Roselle's Wares."
        }
      ],
      hidden_events: [],
      completed_events: []
    }, {
      index: 11,
      displayName: "Roselle's Wares",
      src: "assets/shop.jpeg",
      name: 'shop',
      exit: 10,
      incomplete_events: [
        {
          name: "shop",
          storage: "incomplete_events",
          achievementId: null,
          closer: "A fire crackles on your left, warming the room. A shopkeeper calls out from upstairs that she'll be down soon."
        }
      ],
      hidden_events: [],
      completed_events: []
    }
  ])

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

  
  //---------------------------------------------------------------
  //    movement functions
  //---------------------------------------------------------------
  function left() {
    if (locations[currentLocationIndex].left) {
      setCurrentLocationIndex(locations[currentLocationIndex].left)
    }
    else {
      console.log("You cannot move left from here")
    }
  }
  function forward() {
    if (locations[currentLocationIndex].forward) {
      setCurrentLocationIndex(locations[currentLocationIndex].forward)
    }
    else {
      console.log("You cannot move forward from here")
    }
  }
  function right() {
    if (locations[currentLocationIndex].right) {
      setCurrentLocationIndex(locations[currentLocationIndex].right)
    }
    else {
      console.log("You cannot move right from here")
    }
  }
  function backward() {
    if (locations[currentLocationIndex].backward !== undefined) {
      setCurrentLocationIndex(locations[currentLocationIndex].backward)
    }
    else {
      console.log("You cannot move backward from here")
    }
  }
  function enter_shop() {
    if (locations[currentLocationIndex].shop) {
      setCurrentLocationIndex(locations[currentLocationIndex].shop)
    }
    else {
      console.log("You cannot enter_shop from here")
    }
  }
  function exit() {
    if (locations[currentLocationIndex].exit) {
      setCurrentLocationIndex(locations[currentLocationIndex].exit)
    }
    else {
      console.log("You cannot exit from here")
    }
  }

  function hideOldMan() {
    const editing_locations = [...locations]
    editing_locations[3].characters = []
    setLocations(editing_locations)
  }

  function hideArya() {
    const editing_locations = [...locations]
    editing_locations[7].characters = []
    setLocations(editing_locations)
  }
  

  //---------------------------------------------------------------
  //    render characters
  //---------------------------------------------------------------
  function renderCharacters() {
    // if (currentLocationIndex !== 3 && hasMap === true && locations[3].characters) {
    //   hideOldMan()
    // }
    // else if (currentLocationIndex !== 7 && showPortal === true && locations[7].characters) {
    //   hideArya()
    // }
    if (locations[currentLocationIndex].characters) {
      const cards = locations[currentLocationIndex].characters.map(character => <CharacterCard character={character} key={character.id}/>)
      return cards
    }
  }

  function handleSelection(selection) {
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

  function completeCurrentEvent() {
    if (currentEvent.name === "meet_the_old_man") {
      setHasMap(true)
    }
    const editing_locations = [...locations]
    // console.log(editing_locations)
    if (currentEvent.storage === "incomplete_events") {
      // console.log("current event is stored in incomplete events")
      const index = editing_locations[currentLocationIndex].incomplete_events.indexOf(currentEvent)
      const completed_event = editing_locations[currentLocationIndex].incomplete_events.splice(index, index+1)
      editing_locations[currentLocationIndex].completed_events.push(completed_event[0])
      setLocations(editing_locations)
    } else if (currentEvent.storage === "hidden_events") {
      const index = editing_locations[currentLocationIndex].hidden_events.indexOf(currentEvent)
      const completed_event = editing_locations[currentLocationIndex].hidden_events.splice(index, index+1)
      editing_locations[currentLocationIndex].completed_events.push(completed_event[0])
      setLocations(editing_locations)
    } else if (currentEvent.storage === null) {
      setCurrentEvent({})
    }
    setShowContinueButton(false)
    setCanProgress(true)
    setSetup("")
    setCloser("")
    setChoices([])
  }

  function search() {
    setCanProgress(false)
    if (selectedSaveFile.girls_item_location === locations[currentLocationIndex].name) {
      setCurrentEvent({
        name: "ya_found_it",
        storage: null,
        achievementId: null,
        closer: "Something catches your eye. Is that...? It is!! You have found Arya's necklace. She will be so grateful. Better put that someplace safe."
      })
      setShowNecklace(true)
      setFoundGirlsItem(true)
    }
    else if (selectedSaveFile.girls_item_location !== locations[currentLocationIndex].name) {
      setCurrentEvent({
        name: "not_here",
        storage: null,
        achievementId: null,
        closer: "You look, but you can't find Arya's necklace around here."
      })
    console.log(currentEvent)
    }
  }

  function give() {
    console.log("give necklace to arya")
    setShowNecklace(false)
    const editing_locations = [...locations]
    editing_locations[7].characters[0].src = "assets/girl_smiling.jpg"
    editing_locations[7].incomplete_events.push({
      name: "arya_thanks_you",
      achievementId: null,
      storage: "incomplete_events",
      setup: "Thank you! Thank you! Thank you!!! Please let me pay you for your help. You don't know how much this means to me.",
      choices: [
          {selection: "That's very kind of you, but all I want is to find my way home. A portal brought me here and I don't know how I'll ever get home.", setup: "That's awful. If you can bring me to where this portal left you, there should be enough of a trace for me know how to send you back.", choices: [
            {selection: "Really?", closer: "Of course. It's the least I can do."}
          ]},
      ]
    })
    editing_locations[2].incomplete_events.push({
      name: "arya_sends_you_home",
      achievementId: null,
      storage: "incomplete_events",
      setup: `You bring Arya to where you first appeared in Gil'Warren. She holds her hands out and closes her eyes, scanning the air for remnants of the portal that brought you here. Arya wraps her mother's necklace around her palm and steps forward. As she whispers under her breath, light springs forth from her palm. Arya traces out a doorway with her hand and turns to smile at you. "This will take you home," she says.`,
      choices: [
        {selection: "Thank you! I can't wait to see my sister again.", closer: `"You're very welcome. Good luck to you.", says Arya.`},
        {selection: "I'm not ready to go just yet.", closer:`Take your time. This will be here waiting for you when you're ready. Now I'm going to return home. Good luck to you.`}
      ]
    })
    setLocations(editing_locations)
    setShowPortal(true)
    // setCurrentEvent()
    console.log()
  }

  if (currentEvent.name === "arya_sends_you_home" && aryaIsThere === true) {
    setAryaIsThere(false)
  }

  if (currentLocationIndex !== 3 && hasMap === true && oldManIsThere === true) {
    setOldManIsThere(false)
  }

  function goHome() {
    console.log("time to go home")
    const editing_locations = [...locations]
    editing_locations[1].incomplete_events.push({
      name: "no_more_portals",
      achievementId: null,
      storage: "incomplete_events",
      closer: "Whatever drew you into that portal seems to be gone...for now. I don't think this will be the path to clear your thoughts from now on. You'll certainly never forget today. Now it's time to go see your sister."
    })
    editing_locations[1].forward = undefined
    setLocations(editing_locations)
    setCurrentLocationIndex(1)
    setFinished(true)
  }

  function handleZoom(e) {
    setZoomIn(!zoomIn)
    setZoomedImage(e.target)
  }


  return (
    <>
      <div className="row game"> {/* make this add to 12 */}
      {zoomIn ? <img className="map-big" src={zoomedImage.src} alt={zoomedImage.alt}/> :<></>}
        <div className="col-6 location-div">
          {hasMap? <h3>{locations[currentLocationIndex].displayName}</h3> : <></>}
          <img className="location-image" src={locations[currentLocationIndex].src} alt="location"/>
          {currentLocationIndex === 3 && oldManIsThere? <img className="character-image man" src="assets/wizard.jpg" alt="friendly old man"/> : <></>}
          {currentLocationIndex === 7 && aryaIsThere? <img className="character-image arya" src={locations[7].characters[0].src} alt="Arya"/> : <></>}
        </div>
        <div className="col-12 events">
          <h3>Events</h3>
          {setup ? <p>{setup}</p> : <></>}
          {closer ? <p>{closer}</p>: <></>}
          {choices && choices[0] ? <><button onClick={() => handleSelection(choices[0])}>A</button><span> {choices[0].selection}</span></> : <></>}
          {choices && choices[1] ? <><br/><button onClick={() => handleSelection(choices[1])}>B</button><span> {choices[1].selection}</span></> : <></>}
          {choices && choices[2] ? <><br/><button onClick={() => handleSelection(choices[2])}>C</button><span> {choices[2].selection}</span></> : <></>}
          {choices && choices[3] ? <><br/><button onClick={() => handleSelection(choices[3])}>D</button><span> {choices[3].selection}</span></> : <></>}
          {choices && choices[4] ? <><br/><button onClick={() => handleSelection(choices[4])}>E</button><span> {choices[4].selection}</span></> : <></>}
          <div>
          {showContinueButton && !finished ? <button onClick={completeCurrentEvent}>Continue</button> : <></>}
          {canProgress && locations[currentLocationIndex].left ? <button onClick={left}>Left</button> : <></>}
          {canProgress && locations[currentLocationIndex].forward !== undefined ? <button onClick={forward}>Forward</button> : <></>}
          {canProgress && locations[currentLocationIndex].backward !== undefined ? <button onClick={backward}>Backward</button> : <></>}
          {canProgress && locations[currentLocationIndex].right ? <button onClick={right}>Right</button> : <></>}
          {canProgress && locations[currentLocationIndex].shop ? <button onClick={enter_shop}>Enter Shop</button> : <></>}
          {canProgress && locations[currentLocationIndex].exit ? <button onClick={exit}>Exit</button> : <></>}
          {canProgress && locations[7].completed_events.find(event => event.name === "meet_arya") && !foundGirlsItem ? <button onClick={search}>Search</button> : <></>}
          {canProgress && showNecklace && currentLocationIndex === 7? <button onClick={give}>Give Necklace to Arya</button> : <></>}
          {canProgress && showPortal && currentLocationIndex === 2? <button onClick={goHome}>Enter the Portal</button> : <></>}
          {/* {showContinueButton && finished ? <button onClick={endGame}>Continue</button> : <></>} */}
          </div>
        </div>
        <div className="col-12 inventory">
          <h3>Inventory</h3>
          {showNecklace? <div className="inventory-item">
            <img onClick={(e) => handleZoom(e)} className="necklace-image" src="assets/fantasy_necklace_by_artarina_ddm785r-pre.jpg" alt="Leather necklace with a blue-green stone ornamented with copper wire."/>
          </div> : <></>}
          {hasMap? <div className="inventory-item">
            {/* <input type="checkbox" name="checkbox" id="zoom_img" onChange={(e) => handleZoom(e)}/> */}
            {/* <label htmlFor="zoom_img"> */}
            <img onClick={(e) => handleZoom(e)} className="map-image" src="assets/map.jpg" alt="Map of Gil'Warren Forest."/>
            {/* </label> */}
          </div> : <></>}
        </div>
      </div>
    </>
  )
}