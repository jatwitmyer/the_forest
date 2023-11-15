import React from "react";

function Home() {
  return (
    <>
      <div className="unlogged-nav-bar">
        <div className="nav-button empty"><button>Log In</button></div>
        <div className="nav-button filled"><button>Sign Up</button></div>
        <div className="nav-icon settings"><i class="fa fa-cog" aria-hidden="true"></i></div>
      </div>
      <h1>The Forest</h1>
      <div className="nav-button empty"><button>About</button></div>
      <div className="background-image home-trees"><img alt="trees" src=""/></div>
    </>
  )
}

export default Home