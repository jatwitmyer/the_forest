import React, { useState } from "react";
import NavBar from "./NavBar";
import LocationImage from "./LocationImage";

function StartGame( { mostRecentSave } ) {
  console.log(mostRecentSave)
  const starting_path = {
    src: "assets/starting_path.JPG",
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
    backward: spooky1
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
    backward: fork
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
  
  let currentLocation = starting_path
  // currentLocation = starting_path.forward
  
  return (
    <>
      <NavBar/>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-6"><img className="location-image" src={currentLocation.src} alt="location"/></div>
        <div className="col-6"></div>
        {/* <div className="col-2"></div> */}
      </div>
    </>
  )
}

export default StartGame