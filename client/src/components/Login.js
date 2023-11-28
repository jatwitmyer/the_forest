import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../styles/Button";

function Login( { onLogin } ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          navigate('/')
        });
      } else {
        alert('Login failed. Try again.')
        onLogin(null)
        setUsername('')
        setPassword('')
      }
    });
  }

  return (
    <>
      {/* <NavBar/> */}
      <div className="row"> {/* make this add to 12 */}
        <div className="col-3"></div>
        <div className="col-6 form-div">
          <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <label>Username:
              <input 
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br/>
            <label>Password:
              <input 
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br/>
            <Button variant="fill" color="primary" type="submit">
              {isLoading ? "Loading..." : "Login"}
            </Button>
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