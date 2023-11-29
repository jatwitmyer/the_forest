import React, {useEffect, useState} from "react";
import UserCharacterCard from "./UserCharacterCard"
import { useNavigate } from "react-router-dom";

function Account( {user, setUser} ) {
  const [allAchievements, setAllAchievements] = useState([])
  const [achievementFks, setAchievementFks] = useState([])
  const [showEditUsernameForm, setShowEditUsernameForm] = useState(false)
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false)
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showDeleteVerification, setShowDeleteVerification] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetch('/achievements')
    .then(r => r.json())
    .then(data => setAllAchievements(data))
  }, [])
  
  useEffect(() => {
    fetch(`/users_achievements_by_user/${user.id}`)
    .then(r => r.json())
    .then(uas => {
      const achievement_fks = uas.map(userAchievement => userAchievement.achievement_fk)
      setAchievementFks(achievement_fks)
      }) 
  }, [user.id])

  const yourAchievements = (achievementFks.map(achievementFk => allAchievements.filter(item => item.id === achievementFk)[0]))
  // console.log(yourAchievements)

  const renderedAchievements = yourAchievements.map(a => <div key={a.id}><p>{a.id}. {a.name}</p><p>{a.summary}</p></div>)

  function handleEditUsername(e) {
    e.preventDefault()
    console.log("submitted form")
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({
        username: newUsername
      })
    })
    .then(r => r.json())
    .then(data => setUser(data))
    setShowEditUsernameForm(false)
  }

  function handleEditPassword(e) {
    e.preventDefault()
    console.log("submitted form")
    fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({
        password_hash: newPassword
      })
    })
    .then(r => r.json())
    .then(data => setUser(data))
    setShowEditPasswordForm(false)
  }

  // console.log(newUsername)
  // console.log(newPassword)

  function handleDelete() {
    fetch(`/users/${user.id}`, {
      method: 'DELETE',
      headers: {'Content-type': 'application/json; charset=UTF-8'},
      body: {}
    })
    .then(data => {
      setUser(null)
      navigate('/')
      console.log("delete successful")})
    setShowDeleteVerification(false)
  }

  return (
    <div className="account">
      <h1>Account Details</h1>
      {showDeleteVerification? <div>
        <h2>Are you sure you wish to delete your account?</h2>
        <button onClick={handleDelete}>Delete My Account</button>
        <button onClick={() => setShowDeleteVerification(false)}>Cancel</button>
      </div> : <></>}
      <p>Username: {user.username}</p>
      {showEditUsernameForm ? 
        <div>
          <form onSubmit={handleEditUsername}>
            <label>Username</label>
            <input
              type="text"
              name="newUsername"
              defaultValue={user.username}
              onChange={(e) => setNewUsername(e.target.value)}
            ></input>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div> : <></>}
      {showEditPasswordForm ? 
        <div>
          <form onSubmit={handleEditPassword}>
            <label>Password</label>
            <input
              type="text"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <br/>
            <input type="submit" value="Submit"/>
          </form>
        </div> : <></>}
      <button onClick={() => setShowEditUsernameForm(true)}>Edit Username</button>
      <button onClick={() => setShowEditPasswordForm(true)}>Edit Password</button>
      <button onClick={() => setShowDeleteVerification(true)}>Delete Account</button>
      <h3>Your Achievements: </h3>
      {renderedAchievements}
    </div>
  )
}

export default Account
