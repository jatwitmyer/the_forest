import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup( {setUser} ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function handleSignup(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          navigate('/login')
        });
      } else {
        if (r.status === 409) {
          alert("Username taken")
        }
        else{
          alert("Sign up failed. Retry.")
        }
        // console.log(r)
        setUsername('')
        setPassword('')
      }
    });
  }

  return (
    <>
      <div className="row signup"> {/* make this add to 12 */}
        <div className="col-3"></div>
        <div className="col-6 form-div center-card signup-page">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
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
            <input className="submit" type="submit" value="Submit"/>
            <br/>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}


export default Signup