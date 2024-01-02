import React, {useEffect, useState} from "react";
import UserCharacterCard from "./UserCharacterCard"
import { useNavigate } from "react-router-dom";

function Account( {user, setUser} ) {
  const [allAchievements, setAllAchievements] = useState([])
  const [achievementFks, setAchievementFks] = useState([])
  const [showEditUsernameForm, setShowEditUsernameForm] = useState(false)
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false)
  const [newUsername, setNewUsername] = useState(user.username)
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

  function cancelChangeUsername(e) {
    setShowEditUsernameForm(false)
    setNewUsername(user.username)
  }

  function cancelChangePassword() {
    setShowEditPasswordForm(false)
    setNewPassword("")
  }

  console.log(renderedAchievements)

  return (
    <div className="account center-card">
      <h1>Account Details</h1>
      <p>Username: {user.username}</p>
      <h2>Your Achievements: </h2>
      {renderedAchievements.length > 0 ? renderedAchievements : <p>Play to earn achievements</p>}
      <button className='submit' onClick={() => setShowEditUsernameForm(true)}>Edit Username</button>
      <button className='submit' onClick={() => setShowEditPasswordForm(true)}>Edit Password</button>
      <button className='submit' onClick={() => setShowDeleteVerification(true)}>Delete Account</button>
      {showEditUsernameForm ? 
        <div>
          <form onSubmit={handleEditUsername}>
            <label>New Username:
              <input
                type="text"
                name="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              ></input>
            </label>
            <br/>
            <input className='submit' type="submit" value="Submit"/>
            <button className="submit" onClick={(e) => cancelChangeUsername(e)}>Cancel</button>
          </form>
        </div> : <></>}
      {showEditPasswordForm ? 
        <div>
          <form onSubmit={handleEditPassword}>
            <label>New Password:
              <input
                type="text"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            </label>
            <br/>
            <input className='submit' type="submit" value="Submit"/>
            <button className="submit" onClick={cancelChangePassword}>Cancel</button>
          </form>
        </div> : <></>}
      {showDeleteVerification? <div>
        <h2>Are you sure you wish to delete your account?</h2>
        <button className='submit' onClick={handleDelete}>Delete My Account</button>
        <button className='submit' onClick={() => setShowDeleteVerification(false)}>Cancel</button>
      </div> : <></>}
    </div>
  )
}

export default Account
