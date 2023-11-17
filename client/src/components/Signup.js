import React, { useState } from "react";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

function Signup() {
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    setSignupFormData({
        ...signupFormData,
        [e.target.name]: e.target.value
    })
    }
  
  console.log(signupFormData)

  function handleSignup() {}

  return (
    <>
      <NavBar/>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-3"></div>
        <div className="col-6 form-div">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <label>Username:
              <input 
                type="text"
                name="username"
                value={signupFormData.username}
                onChange={handleChange}
              />
            </label>
            <br/>
            <label>Password:
              <input 
                type="text"
                name="password"
                value={signupFormData.password}
                onChange={handleChange}
              />
            </label>
            <br/>
            <input type="submit" value="Sign Up"/>
            <br/>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}


export default Signup