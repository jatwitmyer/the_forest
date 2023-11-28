import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Signup( {setUser} ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  function handleSignup(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
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
      <div className="row"> {/* make this add to 12 */}
        <div className="col-3"></div>
        <div className="col-6 form-div">
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