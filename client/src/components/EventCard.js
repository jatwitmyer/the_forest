import React, { useState } from "react";

function EventCard( { currentEvent, currentLocation, event_id } ) {
  const [setup, setSetup] = useState(currentEvent.setup)
  const [choices, setChoices] = useState(currentEvent.choices)
  // console.log("setup", setup)
  // console.log("choices", choices)
  
  function handleChoice(choice) {
    // console.log(choice)
    if (choice.setup) {
      setSetup(choice.setup)
      setChoices(choice.choices)
      console.log(currentLocation)
    }
    else {
      setSetup(choice.closer)
      setChoices([])
      console.log(currentEvent)
      // console.log(event_id)
      console.log(currentLocation)
      currentLocation.events.find(event => event.id === event_id).completed = true
      // currentLocation..completed = true
    }
  }

  function renderChoices(choices) {
    if (choices.length > 0) {
      const choiceCards = choices.map(choice => <div key={choice.id}><button onClick={() => handleChoice(choice)}> {choice.id} </button><span> {choice.selection}</span></div>)
      return choiceCards
    }
  }
  
  return (
    <div className="event-div">
      <p>{setup}</p>
      {renderChoices(choices)}
    </div>
  )
  }


export default EventCard
