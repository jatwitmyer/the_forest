import React, { useState } from "react";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

function Login() {
  const [loginFormData, setloginFormData] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    setloginFormData({
        ...loginFormData,
        [e.target.name]: e.target.value
    })
    }
  
  console.log(loginFormData)

  function handleLogin() {}

  return (
    <>
      <NavBar/>
      <div className="row"> {/* make this add to 12 */}
        <div className="col-3"></div>
        <div className="col-6 form-div">
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <label>Username:
              <input 
                type="text"
                name="username"
                value={loginFormData.username}
                onChange={handleChange}
              />
            </label>
            <br/>
            <label>Password:
              <input 
                type="text"
                name="password"
                value={loginFormData.password}
                onChange={handleChange}
              />
            </label>
            <br/>
            <input type="submit" value="Log In"/>
            <br/>
            <NavLink to="/signup">Sign Up</NavLink>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}


export default Login